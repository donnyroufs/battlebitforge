app:
	docker-compose up -d 
	sleep 3
	yarn prisma migrate dev
	yarn db:seed
	yarn dev
	