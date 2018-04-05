import eel
eel.init('web')
web_app_options = {
	# 'mode': "chrome-app", #or "chrome"
	'port': 8080,
	'chromeFlags': ["--aggressive-cache-discard"]
}
eel.start('start.html', options=web_app_options)
