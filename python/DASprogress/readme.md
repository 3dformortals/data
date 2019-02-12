#Записная книжка для аниме, сериалов, дорам.
##DASprogress_tk_20190212.py  
### is last version with changed database structure.  
It can rewrite old database version.  
Old versions can't read new database.  

###This version can scan sites uses links:  
- `animevost.org` (count new unwatched episodes)
  - example: `http://animevost.org/tip/tv/2167-tensei-shitara-slime-datta-ken.html`
- `play.shikimori.org` (count new unwatched episodes market with `озвучка`)
  - example: `https://play.shikimori.org/animes/35790-tate-no-yuusha-no-nariagari`  
  - example: `https://play.shikimori.org/animes/35790-tate-no-yuusha-no-nariagari/video_online/1`  
- `anistar.me` (count new unwatched episodes)
  - example: `https://anistar.me/6695-o-moem-pererozhdenii-v-sliz-tensei-shitara-slime-datta-ken.html`
- `vk.com` (count number of videos inside album)
  - example: `https://vk.com/videos-24440848?section=album_54694282`
- `green-teatv.com` (count new unwatched episodes)
  - example: `http://green-teatv.com/5865-uborka-so-strastyu-clean-with-passion-for-now.html`
- `anilibria.tv` (count new unwatched episodes from torrent title)
  - example: `https://www.anilibria.tv/release/ueno-san-wa-bukiyou.html`
- `lostfilm.tv` (count new unwatched episodes from season page)
  - example: `https://www.lostfilm.tv/series/Future_Man/season_2/`  

That make executable run in terminal/console from `DASprogress_tk_***.py` level:  
`pyinstaller DASprogress_tk_***.py --onefile --noconsole`  
Database will be created and stored inside `DASprogress_tk_***.exe` folder.  
File `icon.png` need to be placed in same folder as `*.exe` or `*.py`