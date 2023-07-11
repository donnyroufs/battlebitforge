const SCRAPE_API: &'static str = "https://battlebit.fandom.com";
use std::{str::FromStr, fs::File};

use scraper::{Html, Selector};
use serde::Serialize;

type BoxError = Box<dyn std::error::Error>;

#[tokio::main]
/// Entrypoint
async fn main() -> Result<(), BoxError> {
    let weapons = scrape_weapons().await.unwrap();
    let mut s = vec![];
    for weapon in weapons {
        s.push(scrape_weapon(&weapon).await.unwrap());
    }
    let _ = std::fs::write("/tmp/test.json", serde_json::to_string(&s).unwrap());
    Ok(())
}

async fn scrape_weapon(weapon: &WeaponWikiRef) -> Result<Weapon, BoxError> {
    let resp = reqwest::get(format!("{SCRAPE_API}/{}", weapon.link))
        .await?
        .text()
        .await?;
    let doc = Html::parse_document(&resp);
    let cat_rules = Selector::parse(".wds-tabs__wrapper .wds-tabs__tab-label a").unwrap();
    let attachment_tabs = Selector::parse(".wds-tab__content").unwrap();
    let attachment = Selector::parse("li").unwrap();
    // let attachments_p = Selector::parse(".wds-tab__content p").unwrap();
    // let attachments_a = Selector::parse(".wds-tab__content a").unwrap();
    let mut categories: Vec<WeaponSlot> = doc
        .select(&cat_rules)
        .map(|e| {
            e.first_child()
                .unwrap()
                .value()
                .as_text()
                .unwrap()
                .parse()
                .unwrap()
        })
        .collect();
    // println!("Parsing for {}", weapon.name);
    if categories.len() > 0 {
        // Check same elements found for both.
        assert_eq!(categories.len(), doc.select(&attachment_tabs).count());
        let mut cat_idx = 0;
        let mut current_category = categories.get_mut(cat_idx);

        for tab in doc.select(&attachment_tabs) {
            println!("Inserting to {:?}", &current_category);
            for (i, a) in tab.select(&attachment).enumerate() {
                if let Some(child) = a.first_child() {
                  if let Some(c) = &mut current_category {
                    match child.value().as_text() {
                        Some(s) => c.push_attachment(Attachment(s.to_string())),
                        None => ()
                    }
                  }
                }
            }
            cat_idx += 1;
            current_category = categories.get_mut(cat_idx);
        }
        println!("Categories for {} = {:?}", weapon.name, categories);
    }

    Ok(Weapon {
        name: weapon.name.clone(),
        attachments: categories
    })
}

#[derive(Debug)]
struct WeaponWikiRef {
    name: String,
    link: String,
}

#[derive(Debug, Serialize)]
enum WeaponSlot {
    MainSight(Vec<Attachment>),
    CantedSight(Vec<Attachment>),
    UnderBarrelRail(Vec<Attachment>),
    SideRail(Vec<Attachment>),
    Barrel(Vec<Attachment>),
    Magazine(Vec<Attachment>),
    TopSight(Vec<Attachment>),
    Bolt(Vec<Attachment>),
}

impl WeaponSlot {
    fn push_attachment(&mut self, item: Attachment) {
        match self {
            WeaponSlot::MainSight(v) => v.push(item),
            WeaponSlot::CantedSight(v) => v.push(item),
            WeaponSlot::UnderBarrelRail(v) => v.push(item),
            WeaponSlot::SideRail(v) => v.push(item),
            WeaponSlot::Barrel(v) => v.push(item),
            WeaponSlot::Magazine(v) => v.push(item),
            WeaponSlot::TopSight(v) => v.push(item),
            WeaponSlot::Bolt(v) => v.push(item),
        }
    }

    fn len(&self) -> usize {
        match self {
            WeaponSlot::MainSight(v) => v.len(),
            WeaponSlot::CantedSight(v) => v.len(),
            WeaponSlot::UnderBarrelRail(v) => v.len(),
            WeaponSlot::SideRail(v) => v.len(),
            WeaponSlot::Barrel(v) => v.len(),
            WeaponSlot::Magazine(v) => v.len(),
            WeaponSlot::TopSight(v) => v.len(),
            WeaponSlot::Bolt(v) => v.len()
        }
    }
}

#[derive(Debug, Serialize)]
struct Attachment(String);

#[derive(Serialize)]
struct Weapon {
    name: String,
    attachments: Vec<WeaponSlot>,
}

impl Weapon {
    fn image_name(&self) -> String {
        let replaced = self.name.replace("-", "");
        replaced
    }
}

impl FromStr for WeaponSlot {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_lowercase().replace(" ", "").as_ref() {
            "barrel" => Ok(Self::Barrel(vec![])),
            "mainsight" => Ok(Self::MainSight(vec![])),
            "cantedsight" => Ok(Self::CantedSight(vec![])),
            "underbarrelrail" => Ok(Self::UnderBarrelRail(vec![])),
            "siderail" => Ok(Self::SideRail(vec![])),
            "magazine" => Ok(Self::Magazine(vec![])),
            "topsight" => Ok(Self::TopSight(vec![])),
            "bolt" => Ok(Self::Bolt(vec![])),
            _ => Err(format!("Unknown attachment slot {}", s)),
        }
    }
}

/// Scrape the Battlebit Fandom API for a list of all the weapons
async fn scrape_weapons() -> Result<Vec<WeaponWikiRef>, Box<dyn std::error::Error>> {
    let resp = reqwest::get(format!("{SCRAPE_API}/wiki/{}", "Weapons"))
        .await?
        .text()
        .await?;
    let doc = Html::parse_document(&resp);
    let selector = Selector::parse("table").unwrap();
    let mut tables: Vec<_> = doc.select(&selector).collect();
    // Remove last two tables
    tables.truncate(tables.len() - 2);
    let row_selector = Selector::parse("tbody tr").unwrap();
    let col_selector = Selector::parse("td").unwrap();
    let link_selector = Selector::parse("a").unwrap();

    let mut weapons: Vec<WeaponWikiRef> = vec![];

    for table in tables {
        // Rows
        for row in table.select(&row_selector) {
            for col in row.select(&col_selector).take(1) {
                for a in col.select(&link_selector) {
                    let name = a.inner_html();
                    let link = a.value().attr("href").unwrap_or("");
                    weapons.push(WeaponWikiRef {
                        name,
                        link: link.to_string(),
                    })
                }
            }
        }
    }
    Ok(weapons)
}
