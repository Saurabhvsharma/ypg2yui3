
all: htdocs/index.html htdocs/getting-started.html htdocs/selecting-all.html htdocs/seed-file.html htdocs/digital-clock-1.html htdocs/where-am-i.html htdocs/what-happened.html htdocs/digital-clock-2.html htdocs/digital-clock-3.html htdocs/digital-clock.html templates/page.html templates/css/styles.css

htdocs/index.html: README.md
	mkdir -p htdocs/css
	cp -v templates/css/* htdocs/css/
	mweave README.md -t templates/page.html -d htdocs -o index.html

htdocs/getting-started.html: README.md
	mweave README.md -t templates/page.html -d htdocs -o index.html

htdocs/selecting-all.html: README.md
	mweave README.md -t templates/page.html -d htdocs -o index.html

htdocs/seed-file.html: README.md
	mweave README.md -t templates/page.html -d htdocs -o index.html

htdocs/where-am-i.html: where-am-i.md
	mweave where-am-i.md -d htdocs -o where-am-i.html -t templates/page.html

htdocs/what-happened.html: what-happened.md
	mweave what-happened.md -d htdocs -o what-happened.html -t templates/page.html

htdocs/hello-world.html: README.md
	mweave README.md -t templates/page.html -d htdocs -o index.html

htdocs/digital-clock-1.html: digital-clock-1.md
	mweave digital-clock-1.md -d htdocs -o digital-clock-1.html -t templates/page.html

htdocs/digital-clock-2.html: digital-clock-2.md
	mweave digital-clock-2.md -d htdocs -o digital-clock-2.html -t templates/page.html
	
htdocs/digital-clock-3.html: digital-clock-3.md
	mweave digital-clock-3.md -d htdocs -o digital-clock-3.html -t templates/page.html
	
htdocs/digital-clock-4.html: digital-clock-4.md
	mweave digital-clock-4.md -d htdocs -o digital-clock-4.html -t templates/page.html
	
htdocs/digital-clock.html: digital-clock.md
	mweave digital-clock.md -d htdocs -o digital-clock.html -t templates/page.html

clean:
	/bin/rm -fR htdocs/*

