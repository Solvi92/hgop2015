Vagrant
	Notar VirtualBox og gerir okkur kleift að setja upp okkar umhverfi á VirtualBoxinu. Ég er með linux og þurfti ekki að nota þetta.
VirtualBox
	Býr til virtual server inn á harðadisknum sem VirtualBox er keyrt á. Í ykkar tilfelli er þetta gert til að geta runað linux þótt maður sé með windows/mac. Ég er sjálfur með linux og þarf ekki að nota þetta. 
Grunt
	Tól fyrir javascript verkefni. Þegar þú villt gera fullt af hlutum við verkefnið þitt á reglulegu milli bili þá geturu notað Grunt til þess að keyra þessa hluti í staðinn fyrir að keyra þá handvirkt sjálfur.
npm
	npm er packet manager fyrir javascript umhverfi, úr þessum packet manager getur þú nálgast og sótt pakka sem þú villt nota með umhvernifnu þínu
nodejs
	notað til að forrita server-side vef forrit og er skrifað í javascript, bæði geturu notða hann fyrir APIs og servera. nodejs er keyrt á V8.
bower
	Bower er packet manager sem er sóttur úr packet managernum npm. En hann er notaður til að sækja libraries sem gera þer kleift að skilgreina, útgáfu stilla og sækja dependencies.


Day 9.
Result from my load test
	Ég prufaði að load testa á dev vélinni sem er mikið hraðari en test vélin þar sem dev vélin er mín vél á meðan test vélin er virtualbox. Þannig fyrst þegar ég notaði jenkins þá þurfti ég að lækka leikina frá 1000 leiki á 9 sec nyður í 100 leiki á 8 sec.
	Should play 100 games under 8 seconds. (6779ms) 
	Should play 100 games under 8 seconds. (4562ms)
	Should play 100 games under 8 seconds. (4433ms)
	Should play 100 games under 8 seconds. (4502ms)
	Should play 100 games under 8 seconds. (4492ms)
	Should play 100 games under 8 seconds. (7002ms)
Does the load test run in serial or in parallel?
	They run in serial.
What does this give us? Who would use the capability to track versions and why?
	This gives us version controll and a controlled production enviroment. If you need to work on a old version or get something that worked some versions ago you can see them and deploy them again.
Who would use capability to deploy any version and why?
	Þegar það er eitthvað að nýjast version þá er gott að geta farið aftur í tímann fyrir forritara eða þegar gamla versionið gat gert eitthvað sem nýja gat ekki. Líka þegar þú villt hafa ákveðna clienta í einhverju gömlu versioni.

Day 11
to get GameDraw or GameWon you have to somtimes push 2 times in the last place did not have time for that.

Jenkins scripts:
	TicTacToe - Build:
		./dockerbuild.sh
	TicTacToe - Acceptance Test:
		./testenv-push.sh 127.0.0.1 2222 9000
	TicTacToe - Load Test
		./testenv-loadTest.sh
	TicTacToe - Deploy To Production
		./testenv-push.sh 127.0.0.1 2222 6666	

Bless og takk fyrir mig.
Þessir tímar voru mjög þreytandi þar sem maður var mikið fastur á sama stað í langann tíma. En það er krefjandi og skemmtilegt þar sem forritun og að setja upp umhverfi  í kringum verkefni getur verið erfitt og það er allavegana eina leiðin fyrir mig að læra almennilega á hlutina.
Það var góð hjálp í þessum tíma og það var gaman að hafa eitt verkefni sem maður var að vinna í allan tíman í staðin fyrir fullt af litlum verkefnum.

Sölvi Hjaltason.