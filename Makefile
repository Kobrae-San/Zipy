# Variables
COMPOSE = docker compose
NPM = npm

# Colors
YELLOW = \033[33m
RED = \033[31m
GREEN = \033[32m
BLUE = \033[34m
NC = \033[0m # No Color
INFO = @echo "$(BLUE)➜$(NC)"
SUCCESS = @echo "$(GREEN)✔$(NC)"
WARNING = @echo "$(YELLOW)⚠$(NC)"

# Help
.PHONY: help
help: ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "Usage: make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) }' $(MAKEFILE_LIST)

##@ Development
.PHONY: install dev build up down logs restart clean

install: ## Install dependencies for both client and server
	$(INFO) "Installing client dependencies..."
	cd client && $(NPM) install
	$(SUCCESS) "Client dependencies installed"
	$(INFO) "Installing server dependencies..."
	cd server && $(NPM) install
	$(SUCCESS) "Server dependencies installed"

dev: ## Run the application in development mode
	$(INFO) "Starting development servers..."
	@if [ ! -d "client/node_modules" ] || [ ! -d "server/node_modules" ]; then \
		echo "$(RED)Dependencies not installed. Running install...$(NC)"; \
		$(MAKE) install; \
	fi
	@trap 'kill 0' INT; \
	cd client && $(NPM) run dev & \
	cd server && $(NPM) run dev & \
	wait
	$(SUCCESS) "Development servers started"

##@ Docker
build: ## Build Docker images with no cache
	$(INFO) "Building Docker images..."
	$(COMPOSE) build --no-cache
	$(SUCCESS) "Docker images built successfully"

up: ## Start the application in Docker
	$(INFO) "Starting Docker containers..."
	$(COMPOSE) up -d
	$(SUCCESS) "Application is running"
	$(INFO) "Frontend: http://localhost:4124"
	$(INFO) "Backend: http://localhost:3000"

down: ## Stop the application
	$(INFO) "Stopping Docker containers..."
	$(COMPOSE) down
	$(SUCCESS) "Application stopped"

logs: ## Show logs for all containers
	$(COMPOSE) logs -f

restart: down up ## Restart the application

##@ Utilities
status: ## Check the status of Docker containers
	$(COMPOSE) ps

validate: ## Validate docker-compose files
	$(COMPOSE) config

.DEFAULT_GOAL := help