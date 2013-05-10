
all: Sandbox/index.html Sandbox/getting-started.html Sandbox/selecting-all.html Sandbox/seed-file.html Sandbox/digital-clock-1.html Sandbox/where-am-i.html Sandbox/what-happened.html Sandbox/digital-clock-2.html Sandbox/digital-clock-3.html Sandbox/clock.html Sandbox/rss-as-json.html

Sandbox/index.html: README.md
	mweave README.md -t templates/page.html -d Sandbox -o index.html

Sandbox/getting-started.html: README.md
	mweave README.md -t templates/page.html -d Sandbox -o index.html

Sandbox/selecting-all.html: README.md
	mweave README.md -t templates/page.html -d Sandbox -o index.html

Sandbox/seed-file.html: README.md
	mweave README.md -t templates/page.html -d Sandbox -o index.html

Sandbox/where-am-i.html: where-am-i.md
	mweave where-am-i.md -d Sandbox -o where-am-i.html -t templates/page.html

Sandbox/what-happened.html: what-happened.md
	mweave what-happened.md -d Sandbox -o what-happened.html -t templates/page.html

Sandbox/hello-world.html: README.md
	mweave README.md -t templates/page.html -d Sandbox -o index.html

Sandbox/rss-as-json.html: README.md
	mweave README.md -t templates/page.html -d Sandbox -o index.html

Sandbox/digital-clock-1.html: digital-clock-1.md
	mweave digital-clock-1.md -d Sandbox -o digital-clock-1.html -t templates/page.html

Sandbox/digital-clock-2.html: digital-clock-2.md
	mweave digital-clock-2.md -d Sandbox -o digital-clock-2.html -t templates/page.html
	
Sandbox/digital-clock-3.html: digital-clock-2.md
	mweave digital-clock-3.md -d Sandbox -o digital-clock-3.html -t templates/page.html
	
Sandbox/clock.html: clock.md
	mweave clock.md -d Sandbox -o clock.html -t templates/page.html

clean:
	/bin/rm -fR Sandbox/*

