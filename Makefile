
Sandbox/index.html: README.md
	echo "Running mweave on README.md"
	mweave README.md -d Sandbox -o index.html -b templates/page.html

digital-clock.html: digital-clock.md
	echo "Running mweave on digital-clock.md"
	mweave digital-clock.md

where-am-i.html: where-am-i.md
	echo "Running mweave on where-am-i.md"
	mweave where-am-i.md

all:
	mweave README.md -d Sandbox -o index.html -b templates/page.html
	mweave digital-clock.md
	mweave where-am-i.md

