reset:
	docker-compose down
	docker-compose up -d 
	sleep 2
	yarn prisma migrate dev
	yarn db:seed
	