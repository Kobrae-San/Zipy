local-install:
	cd client && npm install &
	cd server && npm install

local-dev:
	cd client && npm run dev &
	cd server && npm run dev

build:
	docker compose build --no-cache

up:
	docker compose up -d