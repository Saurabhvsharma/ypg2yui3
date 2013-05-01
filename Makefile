
Sandbox/index.html: README.md
	echo "Running mweave on README.md"
	mweave README.md -d Sandbox -o index.html -b templates/page.html


all: 
	mweave README.md -d Sandbox -o index.html -b templates/page.html
