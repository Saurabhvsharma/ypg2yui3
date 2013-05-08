all: README.md where-am-i.md digital-clock.md
	mweave README.md -t templates/page.html -d Sandbox -o index.html
	mweave digital-clock.md -d Sandbox -o digital-clock.html -t templates/page.html
	mweave where-am-i.md -d Sandbox -o where-am-i.html -t templates/page.html


