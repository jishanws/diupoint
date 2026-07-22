.PHONY: dev build lint setup

dev:
	pnpm dev

build:
	pnpm build

lint:
	pnpm lint

setup:
	pnpm install
	pnpm prisma:generate
