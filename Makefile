
Sandbox/index.html: README.md
	mweave README.md -d Sandbox -o index.html -b templates/page.html

Sandbox/digital-clock.html: digital-clock.md
	mweave digital-clock.md -d Sandbox -o digital-clock.html -b templates/page.html

Sandbox/where-am-i.html: where-am-i.md
	mweave where-am-i.md -d Sandbox -o where-am-i.html -b templates/page.html

all:
	mweave README.md -d Sandbox -o index.html -b templates/page.html
	mweave digital-clock.md -d Sandbox -o digital-clock.html -b templates/page.html
	mweave where-am-i.md -d Sandbox -o where-am-i.html -b templates/page.html


