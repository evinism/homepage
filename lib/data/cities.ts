const citiesCSV = `city,lat,lng,country,population
Tokyo,35.685,139.7514,Japan,35676000
New York,40.6943,-73.9249,United States,19354922
Mexico City,19.4424,-99.131,Mexico,19028000
Mumbai,19.017,72.857,India,18978000
São Paulo,-23.5587,-46.625,Brazil,18845000
Delhi,28.67,77.23,India,15926000
Shanghai,31.2165,121.4365,China,14987000
Kolkata,22.495,88.3247,India,14787000
Los Angeles,34.1139,-118.4068,United States,12815475
Dhaka,23.7231,90.4086,Bangladesh,12797394
Buenos Aires,-34.6025,-58.3975,Argentina,12795000
Karachi,24.87,66.99,Pakistan,12130000
Cairo,30.05,31.25,Egypt,11893000
Rio de Janeiro,-22.925,-43.225,Brazil,11748000
Ōsaka,34.75,135.4601,Japan,11294000
Beijing,39.9289,116.3883,China,11106000
Manila,14.6042,120.9822,Philippines,11100000
Moscow,55.7522,37.6155,Russia,10452000
Istanbul,41.105,29.01,Turkey,10061000
Paris,48.8667,2.3333,France,9904000
Seoul,37.5663,126.9997,"Korea, South",9796000
Lagos,6.4433,3.3915,Nigeria,9466000
Jakarta,-6.1744,106.8294,Indonesia,9125000
Guangzhou,23.145,113.325,China,8829000
Chicago,41.8373,-87.6861,United States,8675982
London,51.5,-0.1167,United Kingdom,8567000
Lima,-12.048,-77.0501,Peru,8012000
Tehran,35.6719,51.4243,Iran,7873000
Kinshasa,-4.3297,15.315,Congo (Kinshasa),7843000
Bogota,4.5964,-74.0833,Colombia,7772000
Shenzhen,22.5524,114.1221,China,7581000
Wuhan,30.58,114.27,China,7243000
Hong Kong,22.305,114.185,Hong Kong,7206000
Tianjin,39.13,117.2,China,7180000
Chennai,13.09,80.28,India,7163000
Taipei,25.0358,121.5683,Taiwan,6900273
Bangalore,12.97,77.56,India,6787000
Bangkok,13.75,100.5166,Thailand,6704000
Lahore,31.56,74.35,Pakistan,6577000
Chongqing,29.565,106.595,China,6461000
Miami,25.784,-80.2102,United States,6381966
Hyderabad,17.4,78.48,India,6376000
Dallas,32.7937,-96.7662,United States,5733259
Santiago,-33.45,-70.667,Chile,5720000
Philadelphia,40.0076,-75.134,United States,5637884
Belo Horizonte,-19.915,-43.915,Brazil,5575000
Madrid,40.4,-3.6834,Spain,5567000
Houston,29.7868,-95.3905,United States,5446468
Ahmedabad,23.0301,72.58,India,5375000
Ho Chi Minh City,10.78,106.695,Vietnam,5314000
Washington,38.9047,-77.0163,United States,5289420
Atlanta,33.7626,-84.4228,United States,5228750
Toronto,43.7,-79.42,Canada,5213000
Singapore,1.293,103.8558,Singapore,5183700
Luanda,-8.8383,13.2344,Angola,5172900
Baghdad,33.3386,44.3939,Iraq,5054000
Barcelona,41.3833,2.1834,Spain,4920000
Haora,22.5804,88.3299,India,4841638
Shenyeng,41.805,123.45,China,4787000
Khartoum,15.5881,32.5342,Sudan,4754000
Pune,18.53,73.85,India,4672000
Boston,42.3188,-71.0846,United States,4637537
Sydney,-33.92,151.1852,Australia,4630000
St. Petersburg,59.939,30.316,Russia,4553000
Chittagong,22.33,91.8,Bangladesh,4529000
Dongguan,23.0489,113.7447,China,4528000
Riyadh,24.6408,46.7727,Saudi Arabia,4465000
Hanoi,21.0333,105.85,Vietnam,4378000
Guadalajara,20.67,-103.33,Mexico,4198000
Melbourne,-37.82,144.975,Australia,4170000
Alexandria,31.2,29.95,Egypt,4165000
Chengdu,30.67,104.07,China,4123000
Rangoon,16.7834,96.1667,Burma,4088000
Phoenix,33.5722,-112.0891,United States,4081849
Xian,34.275,108.895,China,4009000
Porto Alegre,-30.05,-51.2,Brazil,3917000
Surat,21.2,72.84,India,3842000
Hechi,23.0965,109.6091,China,3830000
Abidjan,5.32,-4.04,Côte D’Ivoire,3802000
Brasília,-15.7833,-47.9161,Brazil,3716996
Ankara,39.9272,32.8644,Turkey,3716000
Monterrey,25.67,-100.33,Mexico,3712000
Yokohama,35.32,139.58,Japan,3697894
Nanjing,32.05,118.78,China,3679000
Montréal,45.5,-73.5833,Canada,3678000
Guiyang,26.58,106.72,China,3662000
Recife,-8.0756,-34.9156,Brazil,3651000
Seattle,47.6211,-122.3244,United States,3643765
Harbin,45.75,126.65,China,3621000
San Francisco,37.7562,-122.443,United States,3603761
Fortaleza,-3.75,-38.58,Brazil,3602319
Zhangzhou,24.5204,117.67,China,3531147
Detroit,42.3834,-83.1024,United States,3522206
Salvador,-12.97,-38.48,Brazil,3484000
Busan,35.0951,129.01,"Korea, South",3480000
Johannesburg,-26.17,28.03,South Africa,3435000
Berlin,52.5218,13.4015,Germany,3406000
Algiers,36.7631,3.0506,Algeria,3354000
Rome,41.896,12.4833,Italy,3339000
Pyongyang,39.0194,125.7547,"Korea, North",3300000
Medellín,6.275,-75.575,Colombia,3297000
Kabul,34.5167,69.1833,Afghanistan,3277000
Athens,37.9833,23.7333,Greece,3242000
Nagoya,35.155,136.915,Japan,3230000
Cape Town,-33.92,18.435,South Africa,3215000
San Diego,32.8312,-117.1226,United States,3210314
Changchun,43.865,125.34,China,3183000
Casablanca,33.6,-7.6164,Morocco,3181000
Dalian,38.9228,121.6298,China,3167000
Kanpur,26.46,80.32,India,3162000
Kano,12,8.52,Nigeria,3140000
Tel Aviv-Yafo,32.08,34.77,Israel,3112000
Addis Ababa,9.0333,38.7,Ethiopia,3100000
Curitiba,-25.42,-49.32,Brazil,3084000
Zibo,36.8,118.05,China,3061000
Jeddah,21.5169,39.2192,Saudi Arabia,3012000
Nairobi,-1.2833,36.8167,Kenya,3010000
Hangzhou,30.25,120.17,China,3007000
Benoni,-26.1496,28.3299,South Africa,2986000
Caracas,10.501,-66.917,Venezuela,2985000
Milan,45.47,9.205,Italy,2945000
Stuttgart,48.78,9.2,Germany,2944700
Kunming,25.07,102.68,China,2931000
Dar es Salaam,-6.8,39.2683,Tanzania,2930000
Minneapolis,44.9635,-93.2678,United States,2926757
Jaipur,26.9211,75.81,India,2917000
Taiyuan,37.875,112.5451,China,2913000
Frankfurt,50.1,8.675,Germany,2895000
Qingdao,36.09,120.33,China,2866000
Surabaya,-7.2492,112.7508,Indonesia,2845000
Lisbon,38.7227,-9.1449,Portugal,2812000
Tampa,27.9937,-82.4454,United States,2804240
Jinan,36.675,116.995,China,2798000
Fukuoka,33.595,130.41,Japan,2792000
Campinas,-22.9,-47.1,Brazil,2791000
Denver,39.7621,-104.8759,United States,2787266
Kaohsiung,22.6333,120.2666,Taiwan,2769072
Quezon City,14.6504,121.03,Philippines,2761720
Katowice,50.2604,19.02,Poland,2746000
Aleppo,36.23,37.17,Syria,2738000
Durban,-29.865,30.98,South Africa,2729000
Kiev,50.4334,30.5166,Ukraine,2709000
Lucknow,26.855,80.915,India,2695000
El Giza,30.01,31.19,Egypt,2681863
Zhengzhou,34.755,113.6651,China,2636000
Taichung,24.1521,120.6817,Taiwan,2629323
Brooklyn,40.6501,-73.9496,United States,2629150
Ibadan,7.38,3.93,Nigeria,2628000
Faisalabad,31.41,73.11,Pakistan,2617000
Fuzhou,26.08,119.3,China,2606000
Dakar,14.7158,-17.4731,Senegal,2604000
Changsha,28.2,112.97,China,2604000
İzmir,38.4361,27.1518,Turkey,2587000
Xiangtan,27.8504,112.9,China,2586948
Lanzhou,36.056,103.792,China,2561000
Incheon,37.4761,126.6422,"Korea, South",2550000
Sapporo,43.075,141.34,Japan,2544000
Xiamen,24.45,118.08,China,2519000
Guayaquil,-2.22,-79.92,Ecuador,2514000
George Town,5.4136,100.3294,Malaysia,2500000
Mashhad,36.27,59.57,Iran,2469000
Damascus,33.5,36.3,Syria,2466000
Daegu,35.8668,128.607,"Korea, South",2460000
Nagpur,21.17,79.09,India,2454000
Jinxi,40.7503,120.83,China,2426000
Shijianzhuang,38.05,114.48,China,2417000
Tunis,36.8028,10.1797,Tunisia,2412500
Vienna,48.2,16.3666,Austria,2400000
Jilin,43.85,126.55,China,2396000
Omdurman,15.6167,32.48,Sudan,2395159
Bandung,-6.95,107.57,Indonesia,2394000
Bekasi,-6.2173,106.9723,Indonesia,2378211
Mannheim,49.5004,8.47,Germany,2362000
Nanchang,28.68,115.88,China,2350000
Wenzhou,28.02,120.6501,China,2350000
Queens,40.7498,-73.7976,United States,2333054
Vancouver,49.2734,-123.1216,Canada,2313328
Birmingham,52.475,-1.92,United Kingdom,2285000
Cali,3.4,-76.5,Colombia,2254000
Naples,40.84,14.245,Italy,2250000
Sendai,38.2871,141.0217,Japan,2250000
Manchester,53.5004,-2.248,United Kingdom,2230000
Puebla,19.05,-98.2,Mexico,2195000
Tripoli,32.8925,13.18,Libya,2189000
Tashkent,41.3117,69.2949,Uzbekistan,2184000
Nanchong,30.7804,106.13,China,2174000
Havana,23.132,-82.3642,Cuba,2174000
Baltimore,39.3051,-76.6144,United States,2170504
Belém,-1.45,-48.48,Brazil,2167000
Nanning,22.82,108.32,China,2167000
Patna,25.625,85.13,India,2158000
Santo Domingo,18.4701,-69.9001,Dominican Republic,2154000
Ürümqi,43.805,87.575,China,2151000
Zaozhuang,34.88,117.57,China,2145000
Baku,40.3953,49.8622,Azerbaijan,2122300
Accra,5.55,-0.2167,Ghana,2121000
Yantai,37.5304,121.4,China,2116000
Medan,3.58,98.65,Indonesia,2115000
Santa Cruz,-17.7539,-63.226,Bolivia,2102998
Xuzhou,34.28,117.18,China,2091000
Riverside,33.9381,-117.3948,United States,2084749
Linyi,35.08,118.33,China,2082000
Saint Louis,38.6358,-90.2451,United States,2078283
Las Vegas,36.2291,-115.2607,United States,2073045
Maracaibo,10.73,-71.66,Venezuela,2072000
Kuwait,29.3697,47.9783,Kuwait,2063000
Ad Damman,26.4282,50.0997,Saudi Arabia,2054710
Portland,45.5372,-122.65,United States,2052796
Haikou,20.05,110.32,China,2046189
Hiroshima,34.3878,132.4429,Japan,2045000
Baotou,40.6522,109.822,China,2036000
Hefei,31.85,117.28,China,2035000
Indore,22.7151,75.865,India,2026000
Goiânia,-16.72,-49.3,Brazil,2022000
Sanaa,15.3547,44.2066,Yemen,2008000
San Antonio,29.4722,-98.5247,United States,2002530
Port-au-Prince,18.541,-72.336,Haiti,1998000
Haiphong,20.83,106.6801,Vietnam,1969000
Suzhou,33.6361,116.9789,China,1964000
Nanyang,33.0004,112.53,China,1944000
Bucharest,44.4334,26.0999,Romania,1942000
Ningbo,29.88,121.55,China,1923000
Douala,4.0604,9.71,Cameroon,1906000
Tangshan,39.6243,118.1944,China,1879000
Tainan,23,120.2,Taiwan,1876312
Datong,40.08,113.3,China,1873000
Asunción,-25.2964,-57.6415,Paraguay,1870000
Saidu,34.75,72.35,Pakistan,1860310
Brisbane,-27.455,153.0351,Australia,1860000
Rawalpindi,33.6,73.04,Pakistan,1858000
Sacramento,38.5667,-121.4683,United States,1854698
Beirut,33.872,35.5097,Lebanon,1846000
San Jose,37.3018,-121.8485,United States,1821899
Minsk,53.9,27.5666,Belarus,1805000
Kyoto,35.03,135.75,Japan,1805000
Barranquilla,10.96,-74.8,Colombia,1798000
Orlando,28.4788,-81.342,United States,1776841
Valencia,10.23,-67.98,Venezuela,1770000
Shuyang,34.1299,118.7734,China,1770000
Hamburg,53.55,10,Germany,1757000
Vadodara,22.31,73.18,India,1756000
Manaus,-3.1,-60,Brazil,1753000
Shangqiu,34.4504,115.65,China,1753000
Wuxi,31.58,120.3,China,1749000
Palembang,-2.98,104.75,Indonesia,1749000
Brussels,50.8333,4.3333,Belgium,1743000
Essen,51.45,7.0166,Germany,1742135
Cleveland,41.4767,-81.6805,United States,1730363
Bhopal,23.25,77.41,India,1727000
Hohhot,40.82,111.66,China,1726000
Pittsburgh,40.4396,-79.9763,United States,1715297
Luoyang,34.68,112.4701,China,1715000
Santos,-23.9537,-46.3329,Brazil,1709000
Jianmen,30.6501,113.16,China,1708000
Warsaw,52.25,21,Poland,1707000
Rabat,34.0253,-6.8361,Morocco,1705000
Vitória,-20.324,-40.366,Brazil,1704000
Quito,-0.215,-78.5001,Ecuador,1701000
Antananarivo,-18.9166,47.5166,Madagascar,1697000
Coimbatore,11,76.95,India,1696000
Daqing,46.58,125,China,1693000
Luan,31.7503,116.48,China,1690000
Wanzhou,30.82,108.4,China,1680000
Budapest,47.5,19.0833,Hungary,1679000
Turin,45.0704,7.67,Italy,1652000
Suzhou,31.3005,120.62,China,1650000
Ludhiana,30.9278,75.8723,India,1649000
Cincinnati,39.1412,-84.5059,United States,1648254
Kumasi,6.69,-1.63,Ghana,1646000
Manhattan,40.7834,-73.9662,United States,1643734
Qiqihar,47.345,123.99,China,1641000
Anshan,41.115,122.94,China,1639000
Austin,30.3006,-97.7517,United States,1638716
Zhongli,24.965,121.2168,Taiwan,1632616
Handan,36.58,114.48,China,1631000
Taian,36.2,117.1201,China,1629000
Isfahan,32.7,51.7,Iran,1628000
Kansas City,39.1239,-94.5541,United States,1615621
Yaounde,3.8667,11.5167,Cameroon,1611000
Shantou,23.37,116.67,China,1601000
Agra,27.1704,78.015,India,1592000
La Paz,-16.498,-68.15,Bolivia,1590000
Zhanjiang,21.2,110.38,China,1590000
Kalyan,19.2502,73.1602,India,1576614
Abuja,9.0833,7.5333,Nigeria,1576000
Harare,-17.8178,31.0447,Zimbabwe,1572000
Indianapolis,39.7771,-86.1458,United States,1564699
Xiantao,30.3704,113.44,China,1556000
Tijuana,32.5,-117.08,Mexico,1553000
Khulna,22.84,89.56,Bangladesh,1553000
Weifang,36.7204,119.1001,China,1553000
Santiago,19.5,-70.67,Dominican Republic,1550753
Xinyang,32.1304,114.07,China,1541000
Luzhou,28.88,105.38,China,1537000
Perth,-31.955,115.84,Australia,1532000
Toluca,19.3304,-99.67,Mexico,1531000
Leeds,53.83,-1.58,United Kingdom,1529000
Vishakhapatnam,17.73,83.305,India,1529000
Kōbe,34.68,135.17,Japan,1528478
Columbus,39.986,-82.9852,United States,1528314
Multan,30.2,71.455,Pakistan,1522000
Kochi,10.015,76.2239,India,1519000
Gujranwala,32.1604,74.185,Pakistan,1513000
Montevideo,-34.858,-56.1711,Uruguay,1513000
Niterói,-22.9,-43.1,Brazil,1500513
Ganzhou,25.92,114.95,China,1500000
Florence,43.78,11.25,Italy,1500000
Liuzhou,24.28,109.25,China,1497000
Bamako,12.65,-8,Mali,1494000
Conakry,9.5315,-13.6802,Guinea,1494000
Bursa,40.2,29.07,Turkey,1492000
León,21.15,-101.7,Mexico,1488000
Virginia Beach,36.7335,-76.0435,United States,1480383
Nasik,20.0004,73.78,India,1473000
Fushun,41.8654,123.87,China,1470000
Changde,29.03,111.68,China,1469000
Daejeon,36.3355,127.425,"Korea, South",1468000
Charlotte,35.2079,-80.8303,United States,1467362
Neijiang,29.5804,105.05,China,1466000
Phnom Penh,11.55,104.9166,Cambodia,1466000
Quanzhou,24.9,118.58,China,1463000
Kharkiv,50,36.25,Ukraine,1461000
Hyderabad,25.38,68.375,Pakistan,1459000
Bronx,40.8501,-73.8662,United States,1455720
Lomé,6.1319,1.2228,Togo,1452000
Córdoba,-31.4,-64.1823,Argentina,1452000
Huainan,32.63,116.98,China,1451000
Doha,25.2866,51.533,Qatar,1450000
Kuala Lumpur,3.1667,101.7,Malaysia,1448000
Maputo,-25.9553,32.5892,Mozambique,1446000
Kaduna,10.52,7.44,Nigeria,1442000
Gwangju,35.171,126.9104,"Korea, South",1440000
Kawasaki,35.53,139.705,Japan,1437266
San Salvador,13.71,-89.203,El Salvador,1433000
Suining,30.5333,105.5333,China,1425000
Lyon,45.77,4.83,France,1423000
Karaj,35.8004,50.97,Iran,1423000
Kampala,0.3167,32.5833,Uganda,1420000
Tabriz,38.0863,46.3012,Iran,1413000
The Hague,52.08,4.27,Netherlands,1406000
Davao,7.11,125.63,Philippines,1402000
Marseille,43.29,5.375,France,1400000
Meerut,29.0004,77.7,India,1398000
Mianyang,31.47,104.77,China,1396000
Semarang,-6.9666,110.42,Indonesia,1396000
Faridabad,28.4333,77.3167,India,1394000
Novosibirsk,55.03,82.96,Russia,1389000
Makkah,21.43,39.82,Saudi Arabia,1385000
Dubai,25.23,55.28,United Arab Emirates,1379000
Milwaukee,43.064,-87.9669,United States,1377808
Auckland,-36.8481,174.763,New Zealand,1377200
Maanshan,31.7304,118.48,China,1366302
Brazzaville,-4.2592,15.2847,Congo (Brazzaville),1355000
Lubumbashi,-11.68,27.48,Congo (Kinshasa),1352000
Yiyang,28.6004,112.33,China,1352000
Varanasi,25.33,83,India,1352000
Ciudad Juárez,31.6904,-106.49,Mexico,1343000
Ghaziabad,28.6604,77.4084,India,1341000
Pretoria,-25.7069,28.2294,South Africa,1338000
Heze,35.23,115.45,China,1338000
Porto,41.15,-8.62,Portugal,1337000
Lusaka,-15.4166,28.2833,Zambia,1328000
Asansol,23.6833,86.9833,India,1328000
Changzhou,31.78,119.97,China,1327000
Mosul,36.345,43.145,Iraq,1316000
Yekaterinburg,56.85,60.6,Russia,1313000
Peshawar,34.005,71.535,Pakistan,1303000
Mandalay,21.97,96.085,Burma,1300000
Jamshedpur,22.7875,86.1975,India,1300000
Mbuji-Mayi,-6.15,23.6,Congo (Kinshasa),1295000
Madurai,9.92,78.12,India,1294000
Adana,36.995,35.32,Turkey,1293000
Sheffield,53.3667,-1.5,United Kingdom,1292900
Jabalpur,23.1751,79.9551,India,1285000
San José,9.935,-84.0841,Costa Rica,1284000
Panama City,8.968,-79.533,Panama,1281000
Nizhny Novgorod,56.333,44.0001,Russia,1278000
Chifeng,42.27,118.95,China,1277000
Duisburg,51.43,6.75,Germany,1276757
Munich,48.1299,11.575,Germany,1275000
Stockholm,59.3508,18.0973,Sweden,1264000
Huaiyin,33.58,119.03,China,1264000
Ujungpandang,-5.14,119.432,Indonesia,1262000
Rajkot,22.31,70.8,India,1260000
Dhanbad,23.8004,86.42,India,1246000
Mudangiang,44.575,129.59,China,1244000
Geneva,46.21,6.14,Switzerland,1240000
Shiraz,29.63,52.57,Iran,1240000
Huzhou,30.8704,120.1,China,1231000
Tianshui,34.6,105.92,China,1225000
Lupanshui,26.5944,104.8333,China,1221000
Düsseldorf,51.2204,6.78,Germany,1220000
Maoming,21.9204,110.87,China,1217715
Seville,37.405,-5.98,Spain,1212045
Amritsar,31.64,74.87,India,1212000
Vila Velha,-20.3676,-40.318,Brazil,1209091
Vila Velha,3.2167,-51.2167,Brazil,1209091
Almaty,43.325,76.915,Kazakhstan,1209000
Providence,41.8229,-71.4186,United States,1206642
Warangal,18.01,79.58,India,1203853
Rosario,-32.9511,-60.6663,Argentina,1203000
Allahabad,25.455,81.84,India,1201000
Benin City,6.3405,5.62,Nigeria,1190000
Maceió,-9.62,-35.73,Brazil,1186000
Jining,35.4004,116.55,China,1186000
Sofia,42.6833,23.3167,Bulgaria,1185000
Abbottabad,34.1495,73.1995,Pakistan,1183647
Banghazi,32.1167,20.0667,Libya,1180000
Cilacap,-7.7188,109.0154,Indonesia,1174964
Prague,50.0833,14.466,Czechia,1162000
Glasgow,55.8744,-4.2507,United Kingdom,1160000
Leshan,29.5671,103.7333,China,1157000
Jacksonville,30.3322,-81.6749,United States,1156291
Ouagadougou,12.3703,-1.5247,Burkina Faso,1149000
Adelaide,-34.935,138.6,Australia,1145000
Ottawa,45.4167,-75.7,Canada,1145000
Shangrao,28.4704,117.97,China,1144577
Torreón,25.5701,-103.42,Mexico,1144000
Srinagar,34.1,74.815,India,1140000
Samara,53.195,50.1513,Russia,1137000
Vijayawada,16.52,80.63,India,1137000
Omsk,54.99,73.4,Russia,1135000
Newcastle,-32.8453,151.815,Australia,1134616
Yulin,22.63,110.15,China,1127000
Nampo,38.7669,125.4524,"Korea, North",1127000
Xianyang,34.3456,108.7147,China,1126000
Cagayan de Oro,8.4508,124.6853,Philippines,1121561
Can Tho,10.05,105.77,Vietnam,1121000
Barquisimeto,10.05,-69.3,Venezuela,1116000
Kazan,55.7499,49.1263,Russia,1115000
Helsinki,60.1756,24.9341,Finland,1115000
Aurangabad,19.8957,75.3203,India,1113000
Calgary,51.083,-114.08,Canada,1110000
Nezahualcoyotl,19.41,-99.03,Mexico,1109363
Zürich,47.38,8.55,Switzerland,1108000
Baoding,38.8704,115.48,China,1107000
Zigong,29.4,104.78,China,1105000
Sharjah,25.3714,55.4065,United Arab Emirates,1103027
Yerevan,40.1812,44.5136,Armenia,1102000
Mogadishu,2.0667,45.3667,Somalia,1100000
Huambo,-12.75,15.76,Angola,1100000
Ankang,32.68,109.02,China,1100000
Tbilisi,41.725,44.7908,Georgia,1100000
Ikare,7.5304,5.76,Nigeria,1099931
Belgrade,44.8186,20.468,Serbia,1099000
Salt Lake City,40.7774,-111.9301,United States,1098400
Bhilai,21.2167,81.4333,India,1097000
Jinhua,29.12,119.65,China,1092852
Chelyabinsk,55.155,61.4387,Russia,1091000
Natal,-5.78,-35.24,Brazil,1088000
Dushanbe,38.56,68.7739,Tajikistan,1086244
København,55.6786,12.5635,Denmark,1085000
Changwon,35.2191,128.5836,"Korea, South",1081499
Zhuzhou,27.83,113.15,China,1080000
Suwon,37.2578,127.0109,"Korea, South",1078000
Nashville,36.1714,-86.7844,United States,1076645
Vereeniging,-26.6496,27.96,South Africa,1074000
Xiangfan,32.02,112.13,China,1069000
Memphis,35.1047,-89.9773,United States,1068873
Ulsan,35.5467,129.317,"Korea, South",1061000
Zhucheng,35.99,119.3801,China,1060000
Amman,31.95,35.9333,Jordan,1060000
Richmond,37.5295,-77.4756,United States,1059907
Dublin,53.3331,-6.2489,Ireland,1059000
Edmonton,53.55,-113.5,Canada,1058000
Sholapur,17.6704,75.9,India,1057000
Rostov,47.2346,39.7127,Russia,1052000
Dnipro,48.48,35,Ukraine,1050000
Xining,36.62,101.77,China,1048000
Zhangjiakou,40.83,114.93,China,1046000
Gaziantep,37.075,37.385,Turkey,1044000
Lille,50.65,3.08,France,1044000
Ranchi,23.37,85.33,India,1044000
Monrovia,6.3106,-10.8048,Liberia,1041000
São Luís,-2.516,-44.266,Brazil,1038000
Amsterdam,52.35,4.9166,Netherlands,1031000
Jerusalem,31.7784,35.2066,Israel,1029300
New Orleans,30.0687,-89.9288,United States,1029123
Guatemala,14.6211,-90.527,Guatemala,1024000
Florianópolis,-27.58,-48.52,Brazil,1023000
Zhuhai,22.2769,113.5678,China,1023000
Port Elizabeth,-33.97,25.6,South Africa,1021000
Port Harcourt,4.81,7.01,Nigeria,1020000
Jiamusi,46.83,130.35,China,1020000
Raleigh,35.8323,-78.6439,United States,1018336
Ufa,54.79,56.04,Russia,1018000
Hengyang,26.88,112.59,China,1016000
Benxi,41.3304,123.75,China,1012000
Louisville,38.1662,-85.6488,United States,1011696
Haifa,32.8204,34.98,Israel,1011000
Medina,24.5,39.58,Saudi Arabia,1010000
Bucaramanga,7.1301,-73.1259,Colombia,1009000
Maracay,10.2469,-67.5958,Venezuela,1007000
Rotterdam,51.92,4.48,Netherlands,1005000
Hims,34.73,36.72,Syria,1005000
Cologne,50.93,6.95,Germany,1004000
Qinhuangdao,39.9304,119.62,China,1003000
Fez,34.0546,-5.0004,Morocco,1002000
Aden,12.7797,45.0095,Yemen,1000000
Da Nang,16.06,108.25,Vietnam,1000000
Cochabamba,-17.41,-66.17,Bolivia,1000000
Yongzhou,26.2304,111.62,China,1000000
Baoshan,25.12,99.15,China,1000000
Kitakyūshū,33.8704,130.82,Japan,997536
Perm,58,56.25,Russia,997000
Ahvaz,31.28,48.72,Iran,996000
Jodhpur,26.2918,73.0168,India,995000
San Luis Potosí,22.17,-101,Mexico,992000
Odessa,46.49,30.71,Ukraine,991000
Yinchuan,38.468,106.273,China,991000
Ndjamena,12.1131,15.0491,Chad,989000
Donetsk,48,37.83,Ukraine,988000
Joinville,-26.32,-48.8399,Brazil,988000
Jiaxing,30.7704,120.75,China,988000
Guilin,25.28,110.28,China,987000
Dahuk,36.8667,43,Iraq,986000
Volgograd,48.71,44.5,Russia,984000
Guwahati,26.16,91.77,India,983000
Yichun,27.8333,114.4,China,982000
Yangquan,37.87,113.57,China,981448
Natal,-6.9838,-60.2699,Brazil,980588
Chandigarh,30.72,76.78,India,979000
Gwalior,26.23,78.1801,India,978000
Hamamatsu,34.7181,137.7327,Japan,977023
Qom,34.65,50.95,Iran,973000
Mérida,20.9666,-89.6166,Mexico,965000
Jixi,45.3,130.97,China,965000
Xinyi,34.38,118.35,China,962656
Querétaro,20.63,-100.38,Mexico,961000
Pingxiang,27.62,113.85,China,961000
Kelang,3.0204,101.55,Malaysia,956000
João Pessoa,-7.1011,-34.8761,Brazil,956000
Jinzhou,41.1204,121.1,China,956000
Oklahoma City,35.4676,-97.5136,United States,955998
Salerno,40.6804,14.7699,Italy,954265
Thiruvananthapuram,8.5,76.95,India,954000
Kozhikode,11.2504,75.77,India,953000
Ogbomosho,8.13,4.24,Nigeria,951000
Tiruchirappalli,10.81,78.69,India,951000
General Santos,6.1108,125.1747,Philippines,950530
Hue,16.47,107.58,Vietnam,950000
Bacolod,10.6317,122.9817,Philippines,949354
Nantong,32.0304,120.825,China,947000
Tegucigalpa,14.102,-87.2175,Honduras,946000
Foshan,23.0301,113.12,China,943000
Songnam,37.4386,127.1378,"Korea, South",942000
Bridgeport,41.1909,-73.1958,United States,938406
Kingston,17.9771,-76.7674,Jamaica,937700
Naypyidaw,19.7666,96.1186,Burma,930000
Nice,43.715,7.265,France,927000
Buffalo,42.9017,-78.8487,United States,926261
Irbil,36.179,44.0086,Iraq,926000
Krasnoyarsk,56.014,92.866,Russia,925000
Djibouti,11.595,43.148,Djibouti,923000
Olinda,-8,-34.85,Brazil,921840
Managua,12.153,-86.2685,Nicaragua,920000
Antwerpen,51.2204,4.415,Belgium,920000
Konya,37.875,32.475,Turkey,919000
Bogor,-6.57,106.75,Indonesia,918000
Niamey,13.5167,2.1167,Niger,915000
Hartford,41.7661,-72.6834,United States,914751
Xinyu,27.8,114.93,China,913000
Huaibei,33.9504,116.75,China,913000
Teresina,-5.095,-42.78,Brazil,907000
Naha,26.2072,127.673,Japan,905238
Xinxiang,35.3204,113.87,China,903000
Goyang,37.6527,126.8372,"Korea, South",903000
Yibin,28.77,104.57,China,902000
Aba,5.1004,7.35,Nigeria,897560
Maiduguri,11.85,13.16,Nigeria,896000
Tirana,41.3275,19.8189,Albania,895350
Kathmandu,27.7167,85.3166,Nepal,895000
Az Zarqa,32.07,36.1,Jordan,894691
Tarsus,36.9204,34.88,Turkey,894318
Bengbu,32.95,117.33,China,894000
Mendoza,-32.8833,-68.8166,Argentina,893000
Hubli,15.36,75.125,India,890000
Concepción,-36.83,-73.05,Chile,889725
Zaria,11.08,7.71,Nigeria,889000
Anyang,36.08,114.35,China,887000
Cartagena,10.3997,-75.5144,Colombia,887000
Mysore,12.31,76.66,India,887000
Ulaanbaatar,47.9167,106.9166,Mongolia,885000
Mexicali,32.65,-115.48,Mexico,885000
Tongliao,43.62,122.27,China,884000
Newcastle,55.0004,-1.6,United Kingdom,882000
Mombasa,-4.04,39.6899,Kenya,882000
Novo Hamburgo,-29.7096,-51.14,Brazil,876990
Callao,-12.07,-77.135,Peru,876877
Bilbao,43.25,-2.93,Spain,875552
Johor Bahru,1.48,103.73,Malaysia,875000
Yichang,30.7,111.28,China,875000
Raipur,21.235,81.635,India,875000
Fort Worth,32.7814,-97.3473,United States,874168
Salem,11.67,78.1801,India,873000
Yangjiang,21.8504,111.97,China,872363
Marrakesh,31.63,-8,Morocco,872000
Kaifeng,34.85,114.35,China,872000
Dandong,40.1436,124.3936,China,870000
Basra,30.5135,47.8136,Iraq,870000
Aguascalientes,21.8795,-102.2904,Mexico,869000
Tucson,32.1546,-110.8782,United States,868391
Okayama,34.672,133.9171,Japan,866092
Xuanzhou,30.9525,118.7553,China,866000
Puch'on,37.4989,126.7831,"Korea, South",866000
Rizhao,35.4304,119.45,China,865000
Bandar Lampung,-5.43,105.27,Indonesia,865000
Palermo,38.125,13.35,Italy,863000
Cardiff,51.5,-3.225,United Kingdom,861400
Kigali,-1.9536,30.0605,Rwanda,860000
Tampico,22.3,-97.87,Mexico,859419
Jiaozuo,35.25,113.22,China,857000
Padang,-0.96,100.36,Indonesia,855000
Jullundur,31.3349,75.569,India,855000
Valparaíso,-33.0478,-71.621,Chile,854000
Zhenjiang,32.22,119.43,China,854000
Zunyi,27.7,106.92,China,849000
Anshun,26.2504,105.93,China,849000
Pingdingshan,33.7304,113.3,China,849000
Toulouse,43.62,1.4499,France,847000
El Paso,31.8479,-106.4309,United States,845674
Nova Iguaçu,-22.74,-43.47,Brazil,844583
Voronezh,51.73,39.27,Russia,844000
Bhubaneshwar,20.2704,85.8274,India,844000
Saratov,51.58,46.03,Russia,843000
Yuci,37.6804,112.73,China,840000
Yancheng,33.3856,120.1253,China,839000
Bishkek,42.8731,74.5852,Kyrgyzstan,837000
Oslo,59.9167,10.75,Norway,835000
Cuernavaca,18.9211,-99.24,Mexico,834001
Linfen,36.0803,111.52,China,834000
Honolulu,21.3294,-157.846,United States,833671
Bangui,4.3666,18.5583,Central African Republic,831925
Warri,5.52,5.76,Nigeria,830106
Tucumán,-26.816,-65.2166,Argentina,830000
Basel,47.5804,7.59,Switzerland,830000
Kermanshah,34.38,47.06,Iran,828313
Thessaloniki,40.6961,22.885,Greece,828000
Omaha,41.2628,-96.0495,United States,827786
Freetown,8.47,-13.2342,Sierra Leone,827000
Kota,25.18,75.835,India,827000
Braga,41.555,-8.4213,Portugal,826833
Jhansi,25.453,78.5575,India,826494
Yueyang,29.3801,113.1,China,826000
Nottingham,52.9703,-1.17,United Kingdom,825600
Agadir,30.44,-9.62,Morocco,825467
Butterworth,5.4171,100.4,Malaysia,821652
Bareilly,28.3454,79.42,India,817000
Jos,9.93,8.89,Nigeria,816824
Xingyi,25.0904,104.89,China,816000
Arequipa,-16.42,-71.53,Peru,815000
Cebu,10.32,123.9001,Philippines,815000
Liverpool,53.416,-2.918,United Kingdom,811000
Rajshahi,24.375,88.605,Bangladesh,810000
Langfang,39.5204,116.68,China,810000
Wuhu,31.3504,118.37,China,810000
Culiacán,24.83,-107.38,Mexico,809000
Zhaotang,27.3204,103.72,China,809000
Valencia,39.485,-0.4,Spain,808000
Cuiabá,-15.5696,-56.085,Brazil,806000
Lingyuan,41.24,119.4011,China,806000
Qui Nhon,13.78,109.18,Vietnam,805290
Malang,-7.98,112.61,Indonesia,805000
Aligarh,27.8922,78.0618,India,805000
Lvov,49.835,24.03,Ukraine,803880
Bordeaux,44.85,-0.595,France,803000
McAllen,26.2325,-98.2467,United States,800904
Baoji,34.38,107.15,China,800000
Pekanbaru,0.565,101.425,Indonesia,799000
Oran,35.71,-0.62,Algeria,798000
Yingkow,40.6703,122.28,China,795000
Bhiwandi,19.35,73.13,India,795000
Liaoyang,41.28,123.18,China,794000
Chihuahua,28.645,-106.085,Mexico,793000
Jammu,32.7118,74.8467,India,791000
Malacca,2.2064,102.2465,Malaysia,788706
Zaporizhzhya,47.8573,35.1768,Ukraine,788000
Moradabad,28.8418,78.7568,India,787000
Antalya,36.89,30.7,Turkey,783000
Al Hudaydah,14.7979,42.953,Yemen,780000
Islamabad,33.7,73.1666,Pakistan,780000
Campo Grande,-20.45,-54.6166,Brazil,778000
Shaoxing,30.0004,120.57,China,777000
Yichun,47.6999,128.9,China,777000
Mangalore,12.9,74.85,India,776632
Wuppertal,51.25,7.17,Germany,776525
Cheongju,36.6439,127.5012,"Korea, South",775096
Zamboanga,6.92,122.08,Philippines,773000
Hamhung,39.9101,127.5454,"Korea, North",773000
Ilorin,8.49,4.55,Nigeria,771000
Fuyang,30.0533,119.9519,China,771000
Saarbrücken,49.2504,6.97,Germany,770001
Fuxin,42.0105,121.66,China,770000
Shiyan,32.57,110.78,China,770000
Quetta,30.22,67.025,Pakistan,768000
Trujillo,-8.12,-79.02,Peru,765171
Kananga,-5.89,22.4,Congo (Kinshasa),765000
Trabzon,40.98,39.72,Turkey,764714
Cotonou,6.4,2.52,Benin,762000
Jincheng,35.5004,112.83,China,760000
Albuquerque,35.1053,-106.6464,United States,758523
Łódź,51.775,19.4514,Poland,758000
Kraków,50.06,19.96,Poland,756000
Vientiane,17.9667,102.6,Laos,754000
Saltillo,25.42,-101.005,Mexico,754000
São José dos Campos,-23.2,-45.8799,Brazil,753769
Hungnam,39.8231,127.6232,"Korea, North",751322
Taizz,13.6045,44.0394,Yemen,751000
Pietermaritzburg,-29.61,30.39,South Africa,750845
Tangier,35.7473,-5.8327,Morocco,750060
Changhua,24.0734,120.5134,Taiwan,750000
Hsinchu,24.8168,120.9767,Taiwan,750000
Fargona,40.39,71.78,Uzbekistan,750000
Namangan,41,71.67,Uzbekistan,750000
Kolhapur,16.7,74.22,India,750000
Liège,50.63,5.58,Belgium,749110
Ciudad Guayana,8.37,-62.62,Venezuela,746535
Birmingham,33.5276,-86.7988,United States,744189
Hegang,47.4,130.37,China,743307
Riga,56.95,24.1,Latvia,742572
Nouakchott,18.0864,-15.9753,Mauritania,742144
Naga,13.6192,123.1814,Philippines,741635
Gdańsk,54.36,18.64,Poland,740000
Ansan,37.3481,126.8595,"Korea, South",739493
Nürnberg,49.45,11.08,Germany,737304
Oyo,7.8504,3.93,Nigeria,736072
Muscat,23.6133,58.5933,Oman,734697
Amravati,20.95,77.77,India,734451
Denpasar,-8.65,115.22,Indonesia,732344
Sokoto,13.06,5.24,Nigeria,732178
Beihai,21.4804,109.1,China,728978
Ashgabat,37.95,58.3833,Turkmenistan,727700
Bremen,53.08,8.8,Germany,724909
As Sulaymaniyah,35.5613,45.4309,Iraq,723170
Zagreb,45.8,16,Croatia,722526
Hannover,52.367,9.7167,Germany,722490
Cúcuta,7.92,-72.52,Colombia,722146
Hamilton,43.25,-79.83,Canada,721053
Moshi,-3.3396,37.34,Tanzania,721018
Shaoguan,24.8,113.58,China,720266
Kumamoto,32.8009,130.7006,Japan,718232
Dayton,39.7797,-84.1998,United States,718169
Lianyungang,34.6004,119.17,China,715600
Acapulco,16.85,-99.916,Mexico,715584
Kandahar,31.61,65.6949,Afghanistan,715542
Dehra Dun,30.3204,78.05,India,714223
Rochester,43.168,-77.6162,United States,711998
Jeonju,35.8314,127.1404,"Korea, South",711424
Samarqand,39.67,66.945,Uzbekistan,708000
Qingyuan,23.7004,113.0301,China,706717
Sarasota,27.3391,-82.5439,United States,706245
Changzhi,36.1839,113.1053,China,706000
Tolyatti,53.4804,49.53,Russia,702879
Jaboatao,-8.11,-35.02,Brazil,702621
Shizuoka,34.9858,138.3854,Japan,701561
Bulawayo,-20.17,28.58,Zimbabwe,699385
Soledad,10.92,-74.77,Colombia,698852
Fresno,36.7834,-119.7941,United States,698021
Meknes,33.9004,-5.56,Morocco,697628
Sarajevo,43.85,18.383,Bosnia And Herzegovina,696731
La Plata,-34.9096,-57.96,Argentina,694253
Malegaon,20.5604,74.525,India,690844
Enugu,6.45,7.5,Nigeria,688862
Chișinău,47.005,28.8577,Moldova,688134
Huangshi,30.22,115.1,China,688090
Aracaju,-10.9,-37.12,Brazil,685356
Allentown,40.5961,-75.4756,United States,682899
Bonn,50.7205,7.08,Germany,680543
San Pedro Sula,15.5,-88.03,Honduras,680091
Nellore,14.44,79.9899,India,678004
Catania,37.5,15.08,Italy,674542
Gorakhpur,26.7504,83.38,India,674246
Ipoh,4.6,101.065,Malaysia,673318
Chongjin,41.7846,129.79,"Korea, North",672614
Tulsa,36.1284,-95.9042,United States,672054
Utsunomiya,36.55,139.87,Japan,667752
Puyang,35.7004,114.98,China,666322
An Najaf,32.0003,44.3354,Iraq,665552
São José dos Pinhais,-25.57,-49.18,Brazil,665063
Santo André,-23.6528,-46.5278,Brazil,662373
Bytom,50.35,18.91,Poland,662247
Pointe-Noire,-4.77,11.88,Congo (Brazzaville),659084
At Taif,21.2622,40.3823,Saudi Arabia,657282
Ismaïlia,30.5903,32.26,Egypt,656135
Concord,37.9722,-122.0016,United States,654770
Shimoga,13.9304,75.56,India,654055
Biên Hòa,10.97,106.8301,Vietnam,652646
Zhanyi,25.6005,103.8166,China,652604
Kryvyy Rih,47.9283,33.345,Ukraine,652380
Andijon,40.79,72.34,Uzbekistan,650000
Tiruppur,11.0804,77.33,India,650000
Irbid,32.55,35.85,Jordan,650000
Krasnodar,45.02,39,Russia,649851
Zaragoza,41.65,-0.89,Spain,649404
Genoa,44.41,8.93,Italy,647497
Lilongwe,-13.9833,33.7833,Malawi,646750
Diyarbakır,37.9204,40.23,Turkey,644763
Morelia,19.7334,-101.1895,Mexico,644306
Ulyanovsk,54.33,48.41,Russia,640680
Utrecht,52.1003,5.12,Netherlands,640000
Kikwit,-5.03,18.85,Congo (Kinshasa),637736
Al Hufuf,25.3487,49.5856,Saudi Arabia,637389
Yogyakarta,-7.78,110.375,Indonesia,636660
Wrocław,51.1104,17.03,Poland,634893
Winnipeg,49.883,-97.166,Canada,632063
Izhevsk,56.85,53.23,Russia,631038
Cape Coral,26.6444,-81.9956,United States,630134
Springfield,42.1155,-72.5395,United States,628076
Zhuozhou,39.5401,115.79,China,628000
Raurkela,22.2304,84.83,India,625831
Québec,46.84,-71.2456,Canada,624177
Poznań,52.4058,16.8999,Poland,623997
Colorado Springs,38.8674,-104.7606,United States,623946
Bur Said,31.26,32.29,Egypt,623864
Nanded,19.17,77.3,India,623708
Bannu,32.989,70.5986,Pakistan,622419
Asmara,15.3333,38.9333,Eritrea,620802
Southend-on-Sea,51.55,0.72,United Kingdom,618386
Dresden,51.05,13.75,Germany,617515
Wiesbaden,50.0804,8.25,Germany,617126
Charleston,32.8137,-79.9643,United States,616085
Changping,40.2248,116.1944,China,614821
Palu,-0.907,119.833,Indonesia,612445
Taizhou,32.4904,119.9,China,612356
Xiangtai,37.05,114.5,China,611739
Samsun,41.28,36.3437,Turkey,609339
Luxor,25.7,32.65,Egypt,609248
Belgaum,15.865,74.505,India,608756
Pontianak,-0.03,109.32,Indonesia,607311
Yaroslavl,57.62,39.87,Russia,606730
Constantine,36.36,6.5999,Algeria,605179
Bandjarmasin,-3.33,114.5801,Indonesia,603576
Abu Dhabi,24.4667,54.3666,United Arab Emirates,603492
Grand Rapids,42.9615,-85.6557,United States,602694
Kirkuk,35.4722,44.3923,Iraq,601433
Sangli,16.8604,74.575,India,601214
Barcelona,10.1304,-64.72,Venezuela,600954
Mission Viejo,33.6095,-117.6551,United States,600474
Canoas,-29.92,-51.18,Brazil,600000
El Mansura,31.0504,31.38,Egypt,600000
Sohag,26.5504,31.7,Egypt,600000
Barnaul,53.355,83.745,Russia,599579
Zahedan,29.5,60.83,Iran,598887
Jalalabad,34.4415,70.4361,Afghanistan,597971
Albany,42.6664,-73.7987,United States,597270
Chiclayo,-6.7629,-79.8366,Peru,596792
Hermosillo,29.0989,-110.9541,Mexico,595811
Port Louis,-20.1666,57.5,Mauritius,595491
Chandrapur,19.97,79.3,India,595118
Al Hillah,23.4895,46.7564,Saudi Arabia,594605
Al Hillah,32.4721,44.4217,Iraq,594605
Rasht,37.3,49.63,Iran,594590
Nagano,36.65,138.17,Japan,594311
Vinh,18.7,105.68,Vietnam,593645
Abeokuta,7.1604,3.35,Nigeria,593100
Kayseri,38.735,35.49,Turkey,592840
Samarinda,-0.5,117.15,Indonesia,592228
Ajmer,26.45,74.64,India,589985
Dortmund,51.53,7.45,Germany,588462
Vladivostok,43.13,131.91,Russia,587022
Irkutsk,52.32,104.245,Russia,586695
Knoxville,35.9692,-83.9495,United States,585249
Blantyre,-15.79,34.9899,Malawi,584877
Baton Rouge,30.4423,-91.1314,United States,583613
Anqing,30.5,117.05,China,580497
Cuttack,20.47,85.8899,India,580000
Hachiōji,35.6577,139.3261,Japan,579399
Khabarovsk,48.455,135.12,Russia,579000
Veracruz,19.1773,-96.16,Mexico,578963
Kisangani,0.52,25.22,Congo (Kinshasa),578470
Libreville,0.3854,9.458,Gabon,578156
Kerman,30.3,57.08,Iran,577514
Urmia,37.53,45,Iran,577307
Bikaner,28.0304,73.3299,India,576015
Quetzaltenango,14.83,-91.52,Guatemala,575263
Bakersfield,35.353,-119.036,United States,574362
Ogden,41.228,-111.9677,United States,573632
Shihezi,44.3,86.0299,China,573182
Kuching,1.53,110.33,Malaysia,570407
Shuozhou,39.3004,112.42,China,570000
Niigata,37.92,139.04,Japan,569797
Pereira,4.8104,-75.68,Colombia,568750
Macau,22.203,113.545,Macau,568700
New Haven,41.3112,-72.9245,United States,568144
Bouaké,7.69,-5.03,Côte D’Ivoire,567481
Columbia,34.037,-80.9042,United States,566166
Akron,41.0802,-81.5219,United States,565920
Binjai,3.6204,98.5001,Indonesia,564979
Manama,26.2361,50.5831,Bahrain,563920
Uberlândia,-18.9,-48.28,Brazil,563536
Sorocaba,-23.49,-47.47,Brazil,563281
Tongling,30.9504,117.78,China,562832
Weihai,37.5,122.1,China,560255
Mar del Plata,-38,-57.58,Argentina,555897
Santiago de Cuba,20.025,-75.8213,Cuba,555865
Siping,43.17,124.33,China,555609
Kagoshima,31.586,130.5611,Japan,555352
Surakarta,-7.565,110.825,Indonesia,555308
Makhachkala,42.98,47.5,Russia,554981
Bhavnagar,21.7784,72.13,India,554978
Uyo,5.008,7.85,Nigeria,554906
Bristol,51.45,-2.5833,United Kingdom,553528
Bahawalpur,29.39,71.675,Pakistan,552607
Kenitra,34.2704,-6.58,Morocco,551786
Ribeirão Preto,-21.17,-47.83,Brazil,551267
Kanazawa,36.56,136.64,Japan,551249
Orenburg,51.78,55.11,Russia,550204
Málaga,36.7204,-4.42,Spain,550058
Tabuk,28.3838,36.555,Saudi Arabia,547957
Puerto la Cruz,10.17,-64.68,Venezuela,546616
Jiujiang,29.73,115.98,China,545616
Hisar,29.17,75.725,India,544829
Kashgar,39.4763,75.9699,China,543914
Matola,-25.9696,32.46,Mozambique,543907
Bilaspur,22.0904,82.16,India,543454
Sargodha,32.0854,72.675,Pakistan,542603
Leipzig,51.3354,12.41,Germany,542529
Vilnius,54.6834,25.3166,Lithuania,542366
Tirunelveli,8.7304,77.69,India,542200
Cancún,21.17,-86.83,Mexico,542043
Yangzhou,32.4,119.43,China,539715
Novokuznetsk,53.75,87.115,Russia,539616
Al Ladhiqiyah,35.54,35.78,Syria,539147
Matamoros,25.88,-97.5,Mexico,538785
Göteborg,57.75,12,Sweden,537797
Ōtsu,35.0064,135.8674,Japan,536976
Tomsk,56.495,84.975,Russia,535479
Linxia,35.6,103.2,China,534555
Matsuyama,33.8455,132.7658,Japan,533541
Rouen,49.4304,1.08,France,532559
Jiangmen,22.5804,113.08,China,532419
Oaxaca,17.0827,-96.6699,Mexico,530728
Beira,-19.82,34.87,Mozambique,530604
Guntur,16.33,80.45,India,530577
Trablous,34.42,35.87,Lebanon,530000
Hamadan,34.796,48.515,Iran,528256
Cangzhou,38.3204,116.87,China,527681
Kota Kinabalu,5.98,116.11,Malaysia,527671
Gold Coast,-28.0815,153.4482,Australia,527660
Jian,27.1304,115,China,520248
Londrina,-23.3,-51.18,Brazil,520238
Ryazan,54.62,39.72,Russia,520173
Shashi,30.32,112.23,China,520000
Bello,6.33,-75.57,Colombia,519670
Tyumen,57.14,65.53,Russia,519119
Lipetsk,52.62,39.64,Russia,515655
Siliguri,26.7204,88.455,India,515574
Eskişehir,39.795,30.53,Turkey,514869
Banda Aceh,5.55,95.32,Indonesia,513698
Ujjain,23.1904,75.79,India,513350
Salta,-24.7834,-65.4166,Argentina,512686
Penza,53.18,45,Russia,512602
Blida,36.4203,2.83,Algeria,511348
Mykolayiv,46.9677,31.9843,Ukraine,510840
Karbala,32.6149,44.0245,Iraq,510692
Suez,30.005,32.5499,Egypt,508335
Gliwice,50.3304,18.67,Poland,507670
Bukittinggi,-0.3031,100.3615,Indonesia,506964
Liaoyuan,42.9,125.13,China,506548
Kota Baharu,6.12,102.23,Malaysia,505583
Jundiaí,-23.2,-46.88,Brazil,505548
Edinburgh,55.9483,-3.2191,United Kingdom,504966
Tlaxcala,19.32,-98.23,Mexico,503878
Provo,40.2458,-111.6457,United States,503695
Arak,34.0804,49.7,Iran,503647
Davangere,14.47,75.92,India,503564
Viña del Mar,-33.03,-71.54,Chile,503534
Pingtung,22.6817,120.4817,Taiwan,503530
Annaba,36.92,7.76,Algeria,503524
Akola,20.71,77.01,India,503502
Brighton,50.8303,-0.17,United Kingdom,503008
Astrakhan,46.3487,48.055,Russia,502533
Bradford,53.8,-1.75,United Kingdom,501700
Bari,41.1142,16.8728,Italy,500577
Mazatlán,29.0171,-110.1333,Mexico,500000
Awka,6.2104,7.07,Nigeria,500000
San Lorenzo,-25.34,-57.52,Paraguay,500000
Taoyuan,24.9889,121.3111,Taiwan,500000
Chiayi,23.4755,120.4351,Taiwan,500000
Keelung,25.1333,121.7333,Taiwan,500000
Thái Nguyên,21.6,105.83,Vietnam,500000
Shuangyashan,46.6704,131.35,China,500000
El Minya,28.09,30.75,Egypt,500000
Damanhûr,31.0504,30.47,Egypt,500000
Pasuruan,-7.6296,112.9,Indonesia,500000
Tsu,34.7171,136.5167,Japan,500000
Mataram,-8.5795,116.135,Indonesia,499409
Macapá,0.033,-51.05,Brazil,499166
Worcester,42.2705,-71.8079,United States,498997
Reynosa,26.08,-98.3,Mexico,498654
Shahrisabz,39.0618,66.8315,Uzbekistan,498545
Mesa,33.4017,-111.7181,United States,496401
Douma,33.5833,36.4,Syria,496145
Skopje,42,21.4335,Macedonia,494087
Mwanza,-2.52,32.93,Tanzania,493944
Wuwei,37.928,102.641,China,493092
Palm Bay,27.9861,-80.6628,United States,489912
Port Sudan,19.6158,37.2164,Sudan,489725
Santa Fe,-31.6239,-60.69,Argentina,489505
Tula,54.2,37.6299,Russia,489486
Beni Suef,29.0804,31.09,Egypt,489450
Yanji,42.8823,129.5128,China,488740
Toledo,41.6639,-83.5822,United States,488672
Bologna,44.5004,11.34,Italy,488172
Saharanpur,29.97,77.55,India,484873
Murrieta,33.5719,-117.1909,United States,483681
Gulbarga,17.35,76.82,India,483615
Bhatpara,22.8504,88.52,India,483129
Wichita,37.6897,-97.3442,United States,483057
Ife,7.4804,4.56,Nigeria,482365
Feira de Santana,-12.25,-38.97,Brazil,481911
Shah Alam,3.0667,101.55,Malaysia,481654
Mariupol,47.0962,37.5562,Ukraine,481626
Des Moines,41.5725,-93.6104,United States,481222
Tuxtla Gutiérrez,16.75,-93.15,Mexico,481128
Herat,34.33,62.17,Afghanistan,481009
Homyel,52.43,31,Belarus,480951
Zhaoqing,23.0504,112.45,China,480000
Americana,-22.7499,-47.33,Brazil,479472
Dhule,20.9,74.77,India,479073
Ostrava,49.8304,18.25,Czechia,478963
Yazd,31.9201,54.37,Iran,477905
Sialkote,32.52,74.56,Pakistan,477396
Kemerovo,55.34,86.09,Russia,477090
Nazret,8.55,39.27,Ethiopia,476892
Staten Island,40.5834,-74.1496,United States,476015
Jiaojing,28.6804,121.45,China,471500
Chaoyang,41.5504,120.42,China,470296
Juiz de Fora,-21.77,-43.375,Brazil,470193
Udaipur,24.6,73.73,India,469737
Long Beach,33.8059,-118.161,United States,469450
Greenville,34.8363,-82.365,United States,467894
İzmit,40.776,29.9306,Turkey,466504
Piraeus,37.95,23.7,Greece,466065
Shymkent,42.32,69.595,Kazakhstan,465392
Iligan,8.1712,124.2154,Philippines,464599
Qazvin,36.27,50,Iran,464551
Bloemfontein,-29.12,26.2299,South Africa,463064
Calabar,4.9604,8.33,Nigeria,461796
Malatya,38.3704,38.3,Turkey,461574
Panzhihua,26.55,101.73,China,461513
Bandar-e-Abbas,27.2041,56.2721,Iran,461499
Naberezhnyye Chelny,55.7,52.3199,Russia,461086
Hamah,35.1503,36.73,Syria,460602
Cranbourne,-38.0996,145.2834,Australia,460491
Iquitos,-3.75,-73.25,Peru,458729
Mazar-e Sharif,36.7,67.1,Afghanistan,458151
Leicester,52.63,-1.1332,United Kingdom,457983
Kirov,58.5901,49.67,Russia,457437
Jingdezhen,29.2704,117.18,China,457298
Durango,24.0311,-104.67,Mexico,457140
Jambi,-1.59,103.61,Indonesia,457090
Volta Redonda,-22.5196,-44.095,Brazil,456362
Hengshui,37.72,115.7,China,456356
Sfax,34.75,10.72,Tunisia,453050
Sunderland,54.92,-1.38,United Kingdom,452934
Xalapa,19.53,-96.92,Mexico,452186
Luhansk,48.5698,39.3344,Ukraine,452000
Manado,1.48,124.85,Indonesia,451893
Qaraghandy,49.885,73.115,Kazakhstan,451800
An Nasiriyah,31.0429,46.2676,Iraq,451547
Oshawa,43.88,-78.85,Canada,450963
Qitaihe,45.8,130.85,China,450617
Belfast,54.6,-5.96,United Kingdom,450406
Şanlıurfa,37.17,38.795,Turkey,449549
Chengde,40.9604,117.93,China,449325
Xuchang,34.0204,113.82,China,449258
Chlef,36.1704,1.32,Algeria,449167
Ōita,33.2432,131.5979,Japan,448907
Baguio City,16.43,120.5699,Philippines,447824
San Juan,-31.55,-68.52,Argentina,447048
Cheboksary,56.13,47.25,Russia,446781
Ado Ekiti,7.6304,5.22,Nigeria,446749
Balikpapan,-1.25,116.83,Indonesia,445905
Bellary,15.15,76.915,India,445388
Bamenda,5.96,10.15,Cameroon,445299
Gent,51.03,3.7,Belgium,444336
Tokushima,34.0674,134.5525,Japan,443760
Little Rock,34.7255,-92.3581,United States,442699
Wuzhou,23.48,111.32,China,442315
Portsmouth,50.8003,-1.08,United Kingdom,442252
Harrisburg,40.2752,-76.8843,United States,441580
Cabimas,10.43,-71.45,Venezuela,441094
Foz do Iguaçu,-25.5235,-54.53,Brazil,440455
Denton,33.2176,-97.1421,United States,440146
Wakayama,34.2231,135.1677,Japan,440006
Strasbourg,48.58,7.75,France,439972
Madison,43.0808,-89.3922,United States,439553
Mawlamyine,16.5004,97.67,Burma,438861
San Cristóbal,7.77,-72.25,Venezuela,438798
Nantes,47.2104,-1.59,France,438537
Khujand,40.29,69.6199,Tajikistan,437684
Guangyuan,32.43,105.87,China,437435
Khomeini Shahr,32.7004,51.47,Iran,437138
Garoua,9.3,13.39,Cameroon,436899
Bukavu,-2.51,28.84,Congo (Kinshasa),436779
Tuticorin,8.82,78.13,India,436094
Nagasaki,32.765,129.885,Japan,435455
Pohang,36.0209,129.3715,"Korea, South",435266
Kaliningrad,54.7,20.4973,Russia,434954
Likasi,-10.97,26.78,Congo (Kinshasa),434408
Reno,39.5497,-119.8483,United States,433271
Spanish Town,17.9833,-76.95,Jamaica,432704
Port Saint Lucie,27.2796,-80.3883,United States,432589
San Luis,-33.3,-66.35,Argentina,432310
Katsina,12.9904,7.6,Nigeria,432149
Welkom,-27.97,26.73,South Africa,431944
Santa Marta,11.2472,-74.2017,Colombia,431781
Villahermosa,18,-92.9,Mexico,428564
Bryansk,53.26,34.43,Russia,427236
Bournemouth,50.73,-1.9,United Kingdom,426945
Bengkulu,-3.8,102.27,Indonesia,426673
Heidelberg,49.42,8.7,Germany,426590
Oakland,37.7903,-122.2165,United States,425195
Kurnool,15.83,78.03,India,424920
Chaozhou,23.68,116.63,China,424787
Batangas,13.7817,121.0217,Philippines,424508
Bratislava,48.15,17.117,Slovakia,423737
Gaya,24.8,85,India,423692
Ibagué,4.4389,-75.2322,Colombia,421685
Ivanovo,57.01,41.01,Russia,420839
Erzurum,39.9204,41.29,Turkey,420691
Akure,7.2504,5.2,Nigeria,420594
Asyut,27.19,31.1799,Egypt,420585
Kolwezi,-10.7167,25.4724,Congo (Kinshasa),418000
Sukkur,27.7136,68.8486,Pakistan,417767
Luohe,33.57,114.03,China,417356
Campina Grande,-7.23,-35.88,Brazil,417261
Kitchener,43.45,-80.5,Canada,417001
Winston-Salem,36.1029,-80.261,United States,416581
Middlesbrough,54.5804,-1.23,United Kingdom,416042
Meizhou,24.3005,116.12,China,414930
Ardabil,38.25,48.3,Iran,414603
Magnitogorsk,53.4227,58.98,Russia,413351
Gifu,35.4231,136.7628,Japan,412895
Huancayo,-12.08,-75.2,Peru,412733
Nha Trang,12.25,109.17,Vietnam,411556
Maturín,9.75,-63.17,Venezuela,410972
Xuanhua,40.5944,115.0243,China,409745
Kursk,51.74,36.19,Russia,409431
Oujda,34.69,-1.91,Morocco,409391
Metz,49.1203,6.18,France,409186
Al Ayn,24.2305,55.74,United Arab Emirates,408733
Jeju,33.5101,126.5219,"Korea, South",408364
Oshogbo,7.7704,4.56,Nigeria,408245
Indio,33.7346,-116.2346,United States,408097
Ipatinga,-19.4796,-42.52,Brazil,407894
Szczecin,53.4204,14.53,Poland,407811
Durham,35.9797,-78.9037,United States,407575
Syracuse,43.0409,-76.1438,United States,407259
Chattanooga,35.0657,-85.2488,United States,407182
Murcia,37.98,-1.13,Spain,406807
Kitwe,-12.81,28.22,Zambia,404901
Tanta,30.7904,31,Egypt,404901
Lancaster,40.0421,-76.3012,United States,404525
Zanzibar,-6.16,39.2,Tanzania,403658
Taubaté,-23.0195,-45.56,Brazil,403560
Yining,43.9,81.35,China,403489
Bissau,11.865,-15.5984,Guinea-Bissau,403339
Pasay City,14.5504,121,Philippines,403064
Spokane,47.6671,-117.433,United States,403043
Mbale,1.0904,34.17,Uganda,402368
Palm Coast,29.5389,-81.246,United States,401757
Kassala,15.46,36.39,Sudan,401477
Sunchon,39.4236,125.939,"Korea, North",400629
Tver,56.86,35.89,Russia,400212
Surgut,61.2599,73.425,Russia,400000
Jingmen,31.0304,112.1,China,400000
Sikar,27.6104,75.14,India,400000
Tumkur,13.33,77.1,India,399606
Gómez Palacio,25.5701,-103.5,Mexico,399328
Buraydah,26.3664,43.9628,Saudi Arabia,398581
Khmelnytskyy,49.4249,27.0015,Ukraine,398346
Eindhoven,51.43,5.5,Netherlands,398053
Chiang Mai,18.8,98.98,Thailand,397211
Piura,-5.21,-80.63,Peru,396932
Horlivka,48.2996,38.0547,Ukraine,396885
Arlington,32.6998,-97.125,United States,396394
Ndola,-12.9999,28.65,Zambia,396339
Yuxi,24.38,102.57,China,396325
Bonita Springs,26.3559,-81.7861,United States,396220
Poughkeepsie,41.6949,-73.921,United States,396041
Kisumu,-0.09,34.75,Kenya,395615
Stockton,37.9766,-121.3112,United States,394467
Kollam,8.9004,76.57,India,394163
Tallinn,59.4339,24.728,Estonia,394024
Wellington,-41.3,174.7833,New Zealand,393400
El Obeid,13.1833,30.2167,Sudan,393311
Niyala,12.06,24.89,Sudan,392373
Sandakan,5.843,118.108,Malaysia,392288
Ahmednagar,19.1104,74.75,India,391760
Osh,40.5404,72.79,Kyrgyzstan,391277
Stoke,53.0004,-2.18,United Kingdom,390801
Bhilwara,25.3504,74.635,India,389911
Oxnard,34.1962,-119.1819,United States,389792
Comilla,23.4704,91.17,Bangladesh,389411
Augusta,33.3645,-82.0708,United States,389383
Scranton,41.4044,-75.6649,United States,389022
Samut Prakan,13.6069,100.6115,Thailand,388920
Grenoble,45.1804,5.72,France,388574
Nampula,-15.136,39.293,Mozambique,388526
Nizamabad,18.6704,78.1,India,388505
Granada‎,37.165,-3.585,Spain,388290
Brno,49.2004,16.61,Czechia,388277
Coventry,52.4204,-1.5,United Kingdom,388271
Alajuela,10.02,-84.23,Costa Rica,387743
Iloilo,10.705,122.545,Philippines,387681
Campos,-21.75,-41.32,Brazil,387417
Resistencia,-27.46,-58.99,Argentina,387158
Baicheng,45.62,122.82,China,386861
Qarshi,38.8704,65.8,Uzbekistan,386361
Misratah,32.38,15.1,Libya,386120
Hail,27.5236,41.7001,Saudi Arabia,385257
Boise,43.6006,-116.2316,United States,385218
Béjaïa,36.7604,5.07,Algeria,384937
Southampton,50.9,-1.4,United Kingdom,384417
Celaya,20.53,-100.8,Mexico,383697
Pasto,1.2136,-77.2811,Colombia,382236
Modesto,37.6374,-121.0028,United States,381398
Caxias do Sul,-29.18,-51.17,Brazil,381270
Nizhny Tagil,57.92,59.975,Russia,381116
Xichang,27.88,102.3,China,379993
Dezhou,37.4504,116.3,China,379555
Vigo,42.22,-8.73,Spain,378952
Las Palmas,28.1,-15.43,Spain,378495
Parbhani,19.2704,76.76,India,378326
Karlsruhe,49,8.4,Germany,377487
Zhoukou,33.6304,114.63,China,377061
Makiyivka,48.0297,37.9746,Ukraine,376610
Putian,25.4303,119.02,China,376558
Kahramanmaraş,37.61,36.945,Turkey,376045
Manizales,5.06,-75.52,Colombia,375848
Palma,39.5743,2.6542,Spain,375773
Manukau,-37,174.885,New Zealand,375600
Shillong,25.5705,91.88,India,375527
Khorramabad,33.4804,48.35,Iran,375198
Villavicencio,4.1533,-73.635,Colombia,374763
São José do Rio Preto,-20.7996,-49.39,Brazil,374699
Kaunas,54.9504,23.88,Lithuania,374643
Latur,18.4004,76.57,India,374394
Kissimmee,28.3042,-81.4164,United States,374231
Youngstown,41.0993,-80.6463,United States,373728
Shache,38.4261,77.25,China,373492
Seremban,2.7105,101.94,Malaysia,372917
Denizli,37.7704,29.08,Turkey,372344
Van,38.4954,43.4,Turkey,371713
La Coruña,43.33,-8.42,Spain,370610
Abadan,30.3307,48.2797,Iran,370180
Quzhou,28.9704,118.87,China,370000
Rajapalaiyam,9.4204,77.58,India,369991
Reading,51.47,-0.98,United Kingdom,369804
Najran,17.5065,44.1316,Saudi Arabia,369609
Mahilyow,53.8985,30.3247,Belarus,369200
Al-Qatif,26.5196,50.0115,Saudi Arabia,368892
Valletta,35.8997,14.5147,Malta,368250
Mazatlán,23.2211,-106.42,Mexico,368204
Longyan,25.1804,117.03,China,367896
Aurora,39.7084,-104.7274,United States,366623
Bydgoszcz,53.1204,18.01,Poland,366452
Kuantan,3.83,103.32,Malaysia,366229
Gorontalo,0.55,123.07,Indonesia,365497
Nakuru,-0.28,36.07,Kenya,364727
Vladikavkaz,43.0504,44.67,Russia,364630
Larkana,27.5618,68.2068,Pakistan,364033
Christchurch,-43.535,172.63,New Zealand,363200
Stavropol,45.05,41.98,Russia,363064
Sanya,18.2591,109.504,China,362689
Bhagalpur,25.23,86.98,India,361548
Maseru,-29.3167,27.4833,Lesotho,361324
Sheikhu Pura,31.72,73.99,Pakistan,361303
Cusco,-13.525,-71.9722,Peru,361182
Tamale,9.4004,-0.84,Ghana,360579
Ulan Ude,51.825,107.625,Russia,360278
Bobo Dioulasso,11.18,-4.29,Burkina Faso,360106
Lublin,51.2504,22.5727,Poland,360044
Halifax,44.65,-63.6,Canada,359111
Augsburg,48.35,10.9,Germany,358989
Sungai Petani,5.6497,100.4793,Malaysia,358499
Ad Diwaniyah,31.9889,44.924,Iraq,358408
Taraz,42.9,71.365,Kazakhstan,358153
Toulon,43.1342,5.9188,France,357693
Zanjan,36.67,48.5,Iran,357471
San Sebastián,43.3204,-1.98,Spain,357468
Iwaki,37.0553,140.89,Japan,357309
Encarnación,-27.3472,-55.8739,Paraguay,357119
Posadas,-27.3578,-55.8851,Argentina,357119
Fuyu,45.1804,124.82,China,356905
Cà Mau,9.1774,105.15,Vietnam,356636
Asahikawa,43.755,142.38,Japan,356612
Mirput Khas,25.5318,69.0118,Pakistan,356435
Archangel,64.575,40.545,Russia,356051
Wafangdian,39.6259,121.996,China,355844
Ambon,-3.7167,128.2,Indonesia,355596
Orizaba,18.85,-97.13,Mexico,355333
Longxi,35.0476,104.6394,China,355037
Santiago del Estero,-27.7833,-64.2667,Argentina,354692
Mito,36.3704,140.48,Japan,353892
Safi,32.32,-9.24,Morocco,353476
Eldoret,0.52,35.27,Kenya,353381
Rahim Yar Khan,28.4202,70.2952,Pakistan,353203
Neiva,2.931,-75.3302,Colombia,352855
Anaheim,33.839,-117.8572,United States,352497
Vinnytsya,49.2254,28.4816,Ukraine,352115
Hualien,23.9837,121.6,Taiwan,350468
Kuala Terengganu,5.3304,103.12,Malaysia,350210
Qoqon,40.5404,70.94,Uzbekistan,350000
Long Xuyen,10.3804,105.42,Vietnam,350000
Việt Trì,21.3304,105.43,Vietnam,350000
Yumen,39.83,97.73,China,350000
Haarlem,52.3804,4.63,Netherlands,349957
Buon Me Thuot,12.667,108.05,Vietnam,349945
Chimbote,-9.07,-78.57,Peru,349846
Muzaffarnagar,29.485,77.695,India,349706
Nuevo Laredo,27.5,-99.55,Mexico,349550
Lancaster,34.6934,-118.1753,United States,349218
Sanandaj,35.3,47.02,Iran,349176
Linz,48.3192,14.2888,Austria,349161
Camagüey,21.3808,-77.9169,Cuba,347562
Verona,45.4404,10.99,Italy,347459
Victorville,34.5277,-117.3537,United States,346948
London,42.97,-81.25,Canada,346765
Astana,51.1811,71.4278,Kazakhstan,345604
Merida,8.4,-71.13,Venezuela,345489
Charleroi,50.4204,4.45,Belgium,345367
Belgorod,50.63,36.5999,Russia,345289
Kosti,13.17,32.66,Sudan,345068
Al Amarah,31.8416,47.1512,Iraq,345007
Maebashi,36.3927,139.0727,Japan,344871
Pensacola,30.4427,-87.1886,United States,344400
Kurgan,55.46,65.345,Russia,343129
Kohat,33.6027,71.4327,Pakistan,343027
Vitsyebsk,55.1887,30.1853,Belarus,342700
Piracicaba,-22.71,-47.64,Brazil,342209
Yeosu,34.7368,127.7458,"Korea, South",341994
Fayetteville,36.0713,-94.166,United States,341890
Corpus Christi,27.7173,-97.3822,United States,341435
Jhang,31.2804,72.325,Pakistan,341210
Pematangsiantar,2.9614,99.0615,Indonesia,341200
Arusha,-3.36,36.67,Tanzania,341136
Corrientes,-27.49,-58.81,Argentina,340823
Kōriyama,37.41,140.38,Japan,340560
Plovdiv,42.154,24.754,Bulgaria,340494
Chitungwiza,-18,31.1,Zimbabwe,340360
Aksu,41.15,80.25,China,340020
Yaan,29.9804,103.08,China,340000
Tieling,42.3004,123.82,China,340000
Irapuato,20.67,-101.5,Mexico,339554
Kaluga,54.5204,36.27,Russia,338978
East London,-32.97,27.87,South Africa,338627
Jackson,32.3163,-90.2124,United States,338185
Kaesong,37.964,126.5644,"Korea, North",338155
Ciudad Bolívar,8.1,-63.6,Venezuela,338000
Kawagoe,35.9177,139.4911,Japan,337931
Lalitpur,27.6666,85.3333,Nepal,337785
Phan Thiet,10.9337,108.1001,Vietnam,336846
Alor Setar,6.1133,100.3729,Malaysia,336475
Santa Cruz de Tenerife,28.47,-16.25,Spain,336061
Gijón,43.53,-5.67,Spain,335972
Greensboro,36.0956,-79.8269,United States,335588
Kōchi,33.5624,133.5375,Japan,335570
Flint,43.0236,-83.6922,United States,335354
Bauru,-22.33,-49.08,Brazil,335024
Nakhon Ratchasima,15,102.1,Thailand,334984
Orel,52.97,36.07,Russia,334552
Takamatsu,34.3447,134.0448,Japan,334223
Santa Ana,33.7366,-117.8819,United States,334136
Muzaffarpur,26.1204,85.3799,India,333200
Beni,0.4904,29.45,Congo (Kinshasa),332903
Toyama,36.7,137.23,Japan,332812
Hangu,39.232,117.777,China,332793
Medani,14.4,33.52,Sudan,332714
Montes Claros,-16.72,-43.86,Brazil,332379
Bielefeld,52.03,8.53,Germany,331906
Bujumbura,-3.3761,29.36,Burundi,331700
Heyuan,23.7304,114.68,China,330961
Mathura,27.5,77.67,India,330511
Mymensingh,24.7504,90.38,Bangladesh,330126
Baishan,41.9,126.43,China,330000
Patiala,30.3204,76.385,India,329224
Wonsan,39.1605,127.4308,"Korea, North",329207
Pavlodar,52.3,76.95,Kazakhstan,329002
Fort Wayne,41.0885,-85.1436,United States,328564
Maringá,-23.4095,-51.93,Brazil,328335
Sagar,23.8504,78.75,India,328240
Canberra,-35.283,149.129,Australia,327700
Sochi,43.59,39.73,Russia,327608
Montpellier,43.6104,3.87,France,327254
Itajaí,-26.8996,-48.68,Brazil,327126
Sousse,35.83,10.625,Tunisia,327004
Ann Arbor,42.2755,-83.7312,United States,326288
Iași,47.1683,27.5749,Romania,325914
Brahmapur,19.32,84.8,India,324726
Birjand,32.88,59.2199,Iran,324703
Fayetteville,35.0846,-78.9776,United States,324700
Yoshkar Ola,56.6354,47.8749,Russia,324406
Miyazaki,31.9182,131.4184,Japan,324384
Volzhskiy,48.7948,44.7744,Russia,323293
Chenzhou,25.8004,113.0301,China,322997
Valladolid,41.65,-4.75,Spain,322304
Santa Rosa,38.4465,-122.706,United States,321908
Al Kut,32.4907,45.8304,Iraq,321521
Córdoba,37.88,-4.77,Spain,321376
Smolensk,54.7827,32.0473,Russia,320991
Lansing,42.7142,-84.56,United States,320928
Ciudad del Este,-25.5167,-54.6161,Paraguay,320872
Pelotas,-31.75,-52.33,Brazil,320674
Podolsk,55.3804,37.5299,Russia,320635
Kherson,46.6325,32.6007,Ukraine,320477
Shahjahanpur,27.8804,79.905,India,320434
Itu,-23.26,-47.3,Brazil,320170
Legazpi,13.17,123.75,Philippines,320081
Akita,39.71,140.09,Japan,320069
Maroua,10.5956,14.3247,Cameroon,319941
Anápolis,-16.3196,-48.96,Brazil,319587
Pachuca,20.1704,-98.73,Mexico,319581
Bukhara,39.78,64.43,Uzbekistan,319476
Murmansk,68.97,33.1,Russia,319263
Windsor,42.3333,-83.0333,Canada,319246
Holguín,20.8872,-76.2631,Cuba,319102
Oskemen,49.99,82.6149,Kazakhstan,319067
Tepic,21.5054,-104.88,Mexico,318781
Vladimir,56.13,40.4099,Russia,318648
Mobile,30.6783,-88.1162,United States,318084
Hat Yai,6.9964,100.4714,Thailand,317954
Poltava,49.574,34.5703,Ukraine,317847
New Delhi,28.6,77.2,India,317797
Cumaná,10.45,-64.18,Venezuela,317603
Hrodna,53.6779,23.8341,Belarus,317365
Rohtak,28.9,76.58,India,317245
El Faiyum,29.31,30.84,Egypt,316772
Cluj-Napoca,46.7884,23.5984,Romania,316748
Bauchi,10.3104,9.84,Nigeria,316149
Lexington,38.0423,-84.4587,United States,315939
Alicante,38.3512,-0.4836,Spain,315863
Dezful,32.3804,48.47,Iran,315482
Maiquetía,10.6004,-66.97,Venezuela,315442
Armenia,4.5343,-75.6811,Colombia,315328
Timișoara,45.7588,21.2234,Romania,315053
Ljubljana,46.0553,14.515,Slovenia,314807
Pescara,42.4554,14.2187,Italy,314789
Gdynia,54.5204,18.53,Poland,314664
Angeles,15.1451,120.5451,Philippines,314493
Ninde,26.6804,119.5301,China,314077
Aswan,24.0875,32.8989,Egypt,313442
Varna,43.2156,27.8953,Bulgaria,312770
Koblenz,50.3505,7.6,Germany,312633
Cherepovets,59.1404,37.91,Russia,311850
Qurghonteppa,37.8373,68.7713,Tajikistan,311574
Semey,50.435,80.275,Kazakhstan,311353
Galați,45.4559,28.0459,Romania,311156
Brașov,45.6475,25.6072,Romania,311044
Sambalpur,21.4704,83.9701,India,310852
Pucallpa,-8.3689,-74.535,Peru,310750
Antofagasta,-23.65,-70.4,Chile,309832
Huntsville,34.6989,-86.6414,United States,309716
Santa Clarita,34.4155,-118.4992,United States,309378
Asheville,35.5706,-82.5537,United States,309250
Sapele,5.8904,5.68,Nigeria,309162
Dayr az Zawr,35.3304,40.13,Syria,309141
Chita,52.055,113.465,Russia,308500
Valledupar,10.48,-73.25,Colombia,308237
Vitória da Conquista,-14.85,-40.84,Brazil,308204
Antsirabe,-19.85,47.0333,Madagascar,307921
Naltchik,43.4981,43.6179,Russia,307866
Chernihiv,51.5049,31.3015,Ukraine,307684
Ratlam,23.3504,75.03,India,307229
Saint Paul,44.9477,-93.104,United States,306621
Ksar El Kebir,35.0204,-5.91,Morocco,306600
Tawau,4.271,117.896,Malaysia,306462
Firozabad,27.15,78.3949,India,306409
Porto Velho,-8.75,-63.9,Brazil,306180
San Salvador de Jujuy,-24.1833,-65.3,Argentina,305891
Hatay,36.2304,36.12,Turkey,305564
Franca,-20.53,-47.39,Brazil,305041
Rajahmundry,17.0303,81.79,India,304804
Olongapo,14.8296,120.2828,Philippines,304388
Craiova,44.3263,23.8259,Romania,304142
Kom Ombo,24.47,32.95,Egypt,303962
Los Teques,10.42,-67.02,Venezuela,303470
Constanța,44.2027,28.61,Romania,303399
Saransk,54.1704,45.18,Russia,303394
Mengzi,23.3619,103.4061,China,303341
Ganca,40.685,46.35,Azerbaijan,303268
Fort Collins,40.5479,-105.0658,United States,303184
Hakodate,41.795,140.74,Japan,302984
Antioch,37.9789,-121.7957,United States,302885
Chemnitz,50.83,12.92,Germany,302643
Henderson,36.0145,-115.0362,United States,302539
Kingston upon Hull,53.7504,-0.33,United Kingdom,302296
Batman,37.8904,41.14,Turkey,302074
Qena,26.1505,32.72,Egypt,302027
Barddhaman,23.2504,87.865,India,301725
Jinja,0.4404,33.1999,Uganda,301619
Gujrat,32.58,74.08,Pakistan,301506
Tambov,52.73,41.43,Russia,301482
Hami,42.827,93.515,China,300848
Brest,52.1,23.7,Belarus,300715
Mardan,34.2,72.04,Pakistan,300424
Bidar,17.9229,77.5175,India,300136
Qyzylorda,44.8,65.465,Kazakhstan,300000
Rạch Giá,10.0154,105.0914,Vietnam,300000
Sóc Trăng,9.6037,105.98,Vietnam,300000
Porto-Novo,6.4833,2.6166,Benin,300000
Curepipe,-20.3162,57.5166,Mauritius,299975
Kanggye,40.9732,126.6032,"Korea, North",299514
Baqubah,33.7476,44.6573,Iraq,299479
Dumyat,31.4204,31.82,Egypt,299459
Jember,-8.1727,113.6873,Indonesia,298585
Al Mubarraz,25.4291,49.5659,Saudi Arabia,298562
Al Kharj,24.1556,47.312,Saudi Arabia,298428
Aomori,40.825,140.71,Japan,298394
Chernivtsi,48.3053,25.9216,Ukraine,298251
İskenderun,36.5804,36.17,Turkey,297943
Cherkasy,49.4347,32.0709,Ukraine,297568
Trenton,40.2237,-74.764,United States,296869
Bandar Seri Begawan,4.8833,114.9333,Brunei,296500
Rampur,28.8154,79.025,India,296418
Morioka,39.72,141.13,Japan,295172
Ar Ramadi,33.42,43.3,Iraq,295121
Port-of-Spain,10.652,-61.517,Trinidad And Tobago,294934
Vologda,59.21,39.92,Russia,294889
Sumy,50.9243,34.7809,Ukraine,294456
Swansea,51.63,-3.95,United Kingdom,294339
Fukushima,37.74,140.47,Japan,294237
Blumenau,-26.92,-49.09,Brazil,293949
Thiès,14.8104,-16.93,Senegal,293001
Kakinada,16.9675,82.2375,India,292923
Panipat,29.4004,76.97,India,292808
Makurdi,7.73,8.53,Nigeria,292645
Ponta Grossa,-25.09,-50.16,Brazil,292177
Minna,9.62,6.55,Nigeria,291905
Białystok,53.1504,23.17,Poland,291855
Mbeya,-8.89,33.43,Tanzania,291649
Cagliari,39.2224,9.104,Italy,291511
Lakeland,28.0557,-81.9543,United States,291281
Khammam,17.2804,80.1601,India,290839
Bafoussam,5.4904,10.4099,Cameroon,290768
Kasur,31.1254,74.455,Pakistan,290643
Hulan Ergi,47.21,123.61,China,289999
Kassel,51.3,9.5,Germany,289924
Limeira,-22.5495,-47.4,Brazil,289665
Victoria,48.4333,-123.35,Canada,289625
Bhuj,23.2504,69.81,India,289429
Huizhou,23.08,114.4,China,289201
Karimnagar,18.4604,79.11,India,288251
Sinuiju,40.0859,124.4213,"Korea, North",288112
Talcahuano,-36.7167,-73.1167,Chile,288074
Ciudad Obregon,27.4666,-109.925,Mexico,288002
Shreveport,32.4659,-93.7959,United States,287432
Davenport,41.5563,-90.6052,United States,287413
Coatzacoalcos,18.1204,-94.42,Mexico,287285
Springfield,37.1943,-93.2915,United States,287222
Tirupati,13.6504,79.42,India,287035
Cuenca,-2.9,-79,Ecuador,286878
Butembo,0.13,29.28,Congo (Kinshasa),286403
Sekondi,4.9433,-1.704,Ghana,286248
Plano,33.0502,-96.7487,United States,286143
Petrópolis,-22.5095,-43.2,Brazil,286071
Hospet,15.2804,76.375,India,286007
Rangpur,25.75,89.28,Bangladesh,285564
Rockford,42.2598,-89.0641,United States,285562
Newark,40.7245,-74.1725,United States,285154
Lincoln,40.8098,-96.6802,United States,285118
Zagazig,30.5833,31.5167,Egypt,285097
Mandya,12.5704,76.92,India,285034
Round Lake Beach,42.3791,-88.0811,United States,284607
Bago,17.32,96.515,Burma,284318
Barinas,8.6,-70.25,Venezuela,284289
Port Moresby,-9.4647,147.1925,Papua New Guinea,283733
Iksan,35.941,126.9454,"Korea, South",283501
Alwar,27.5454,76.6049,India,283228
Cadiz,10.9587,123.3086,Philippines,283157
Cádiz,36.535,-6.225,Spain,283157
Aizawl,23.7104,92.72,India,283021
Kupang,-10.1787,123.583,Indonesia,282396
Tongchuan,35.08,109.03,China,282258
Zhytomyr,50.2456,28.6622,Ukraine,282192
Jining,41.03,113.08,China,281716
Bahía Blanca,-38.74,-62.265,Argentina,281536
Cap-Haïtien,19.7592,-72.2125,Haiti,281487
Ambato,-1.2696,-78.62,Ecuador,281425
South Bend,41.6771,-86.2692,United States,281100
Gorgan,36.8303,54.48,Iran,281023
Batna,35.57,6.17,Algeria,280798
Tacna,-18,-70.25,Peru,280098
Savannah,32.0282,-81.1786,United States,280082
Tacloban,11.2504,125,Philippines,280006
Xinzhou,38.4104,112.72,China,279607
Cotabato,7.2169,124.2484,Philippines,279519
Rize,41.0208,40.5219,Turkey,279450
Ica,-14.068,-75.7255,Peru,279420
Sumqayt,40.58,49.63,Azerbaijan,279159
Taganrog,47.23,38.92,Russia,279056
Kaolack,14.15,-16.1,Senegal,277812
Kostroma,57.77,40.94,Russia,277656
Irvine,33.6772,-117.7738,United States,277453
Owo,7.2004,5.59,Nigeria,276574
Sukabumi,-6.9096,106.9,Indonesia,276414
Komsomolsk na Amure,50.555,137.02,Russia,275908
Prokopyevsk,53.9,86.71,Russia,275615
Bern,46.9167,7.467,Switzerland,275329
Montería,8.7575,-75.89,Colombia,275198
Mbandaka,0.04,18.26,Congo (Kinshasa),274996
Ciudad Victoria,23.72,-99.13,Mexico,274900
Sétif,36.18,5.4,Algeria,274744
Pamplona,42.82,-1.65,Spain,274545
Jinshi,29.6321,111.8517,China,274000
Ubon Ratchathani,15.25,104.83,Thailand,273893
Crato,-7.4639,-63.04,Brazil,273883
Crato,-7.2296,-39.42,Brazil,273883
Guantánamo,20.1453,-75.2061,Cuba,272801
Blackpool,53.8304,-3.05,United Kingdom,272792
Majene,-3.5336,118.966,Indonesia,272377
Yamagata,38.2705,140.32,Japan,272209
Pakalongan,-6.8796,109.67,Indonesia,272000
Elâzığ,38.68,39.23,Turkey,271492
Sari,36.5504,53.1,Iran,271467
Canton,40.8076,-81.3677,United States,271184
Tasikmalaya,-7.3254,108.2147,Indonesia,271143
Bijapur,16.8354,75.71,India,271064
Venice,45.4387,12.335,Italy,270816
Jersey City,40.7161,-74.0682,United States,270753
Chula Vista,32.6281,-117.0145,United States,270471
Gombe,10.2904,11.17,Nigeria,270366
Münster,51.9704,7.62,Germany,270184
Thohoyandou,-22.95,30.48,South Africa,269707
Kiel,54.3304,10.13,Germany,269427
Malmö,55.5833,13.0333,Sweden,269349
Nancy,48.6837,6.2,France,268976
Mokpo,34.8068,126.3958,"Korea, South",268402
Windhoek,-22.57,17.0835,Namibia,268132
Tebingtinggi,3.3304,99.13,Indonesia,268043
Yanbu al Bahr,24.0943,38.0493,Saudi Arabia,267590
Eugene,44.0563,-123.1173,United States,267568
Tshikapa,-6.41,20.77,Congo (Kinshasa),267462
Reading,40.34,-75.9266,United States,267300
Sterlitamak,53.63,55.96,Russia,267231
Padangsidempuan,1.3887,99.2734,Indonesia,266882
Myeik,12.4541,98.6115,Burma,266720
Temuco,-38.73,-72.58,Chile,265901
Lafayette,30.2083,-92.0322,United States,265746
Lausanne,46.5304,6.65,Switzerland,265702
Saint-Étienne,45.4304,4.38,France,265684
Petrozavodsk,61.85,34.28,Russia,265025
Imphal,24.8,93.95,India,264986
Umuahia,5.532,7.486,Nigeria,264662
Uruapan,19.4204,-102.07,Mexico,264531
Georgetown,6.802,-58.167,Guyana,264350
Sivas,39.7454,37.035,Turkey,264022
Tubruq,32.08,23.96,Libya,263527
Saint Petersburg,27.793,-82.6652,United States,263255
Graz,47.0778,15.41,Austria,263234
Kindu,-2.9639,25.91,Congo (Kinshasa),262914
Lubbock,33.5643,-101.8871,United States,262505
Aqtobe,50.28,57.17,Kazakhstan,262457
Paraná,-31.7333,-60.5333,Argentina,262295
Az Aubayr,30.3892,47.708,Iraq,262219
Peoria,40.752,-89.6155,United States,262010
Hotan,37.0997,79.9269,China,261730
Cabo Frio,-22.89,-42.04,Brazil,261721
Balıkesir,39.6504,27.89,Turkey,261516
Zhuanghe,39.6823,122.9619,China,261510
Sincelejo,9.2904,-75.38,Colombia,261187
Petrolina,-9.38,-40.51,Brazil,260985
Acarigua,9.5804,-69.2,Venezuela,260921
Wollongong,-34.4154,150.89,Australia,260914
Uberaba,-19.78,-47.95,Brazil,260843
Myrtle Beach,33.7096,-78.8843,United States,260487
Laredo,27.5616,-99.487,United States,260244
Adapazarı,40.8,30.415,Turkey,260109
Konibodom,40.2922,70.4272,Tajikistan,259876
Salem,44.9232,-123.0245,United States,259816
Kondoz,36.728,68.8725,Afghanistan,259809
Tampere,61.5,23.75,Finland,259279
Columbus,32.51,-84.8771,United States,259160
Popayán,2.42,-76.61,Colombia,258750
Nonthaburi,13.8337,100.4833,Thailand,258550
Al Mukalla,14.5412,49.1259,Yemen,258132
Rio Branco,-9.9666,-67.8,Brazil,257642
Etawah,26.7855,79.015,India,257448
Mendefera,14.886,38.8163,Eritrea,257390
Cascavel,-24.9596,-53.46,Brazil,257172
Ondo,7.0904,4.84,Nigeria,257005
Chimoio,-19.12,33.47,Mozambique,256936
Ensenada,31.87,-116.62,Mexico,256565
Dzerzhinsk,56.2504,43.46,Russia,256537
Da Lat,11.9304,108.42,Vietnam,256019
Montgomery,32.347,-86.2663,United States,255908
Damaturu,11.749,11.966,Nigeria,255895
Raichur,16.2104,77.355,India,255240
Daloa,6.89,-6.45,Côte D’Ivoire,255168
Rivne,50.6166,26.2528,Ukraine,255106
Turpan,42.9354,89.165,China,254900
Freiburg,48.0004,7.8699,Germany,254889
Poza Rica de Hidalgo,20.5504,-97.47,Mexico,254481
Chuxiong,25.0364,101.5456,China,254370
Cirebon,-6.7333,108.5666,Indonesia,254298
Paramaribo,5.835,-55.167,Suriname,254169
Fort-de-France,14.6104,-61.08,Martinique,253995
Pathankot,32.2703,75.72,India,253987
Chandler,33.2827,-111.8516,United States,253458
Anchorage,61.1508,-149.1091,United States,253421
Tallahassee,30.455,-84.2526,United States,253030
Chirala,15.8604,80.34,India,253000
Buenaventura,3.8724,-77.0505,Colombia,252805
El Fasher,13.63,25.35,Sudan,252609
Dire Dawa,9.59,41.86,Ethiopia,252279
Suihua,46.6304,126.98,China,252245
Messina,38.2005,15.55,Italy,252026
Borujerd,33.92,48.8,Iran,251958
Linhai,28.85,121.12,China,251759
Khon Kaen,16.42,102.83,Thailand,251056
Morogoro,-6.82,37.66,Tanzania,250902
Governador Valadares,-18.87,-41.97,Brazil,250878
Sonipat,29,77.02,India,250521
Santa Clara,22.4,-79.9667,Cuba,250512
Iwo,7.63,4.18,Nigeria,250443
Concord,35.3933,-80.636,United States,250186
Jaffna,9.675,80.005,Sri Lanka,250000
Zumpango,19.8104,-99.11,Mexico,250000
Niš,43.3304,21.9,Serbia,250000
Arua,3.0204,30.9,Uganda,250000
Quảng Ngãi,15.1504,108.83,Vietnam,250000
Luzern,47.0504,8.28,Switzerland,250000
Laiyang,36.9684,120.7084,China,250000
Kashan,33.9804,51.58,Iran,250000
Como,45.81,9.08,Italy,250000
Caserta,41.06,14.3374,Italy,250000
Scottsdale,33.6872,-111.865,United States,249950
Várzea Grande,-15.65,-56.14,Brazil,249752
Kirovohrad,48.5041,32.2603,Ukraine,249454
Melun,48.5333,2.6666,France,249432
Mutare,-18.97,32.65,Zimbabwe,249365
Santa Maria,-29.6833,-53.8,Brazil,249219
Hafar al Batin,28.4337,45.9601,Saudi Arabia,249194
Los Mochis,25.79,-109,Mexico,249047
Jalal Abad,40.9429,73.0025,Kyrgyzstan,248899
Vung Tau,10.3554,107.085,Vietnam,248767
Fukui,36.0704,136.22,Japan,248707
Singkawang,0.912,108.9655,Indonesia,248012
Miskolc,48.1004,20.78,Hungary,247757
Killeen,31.0754,-97.7293,United States,247489
Plymouth,50.3854,-4.16,United Kingdom,247297
Udon Thani,17.4048,102.7893,Thailand,247231
Kattaqorgon,39.9007,66.2608,Uzbekistan,247113
Orsk,51.21,58.6273,Russia,246836
San Bernardo,-33.6,-70.7,Chile,246762
Glendale,33.5796,-112.2258,United States,246709
Oruro,-17.98,-67.13,Bolivia,246501
Bratsk,56.157,101.615,Russia,246348
Wilmington,34.21,-77.886,United States,245910
Matadi,-5.8166,13.45,Congo (Kinshasa),245862
Mirzapur,25.1454,82.57,India,245817
Shimonoseki,33.9654,130.9454,Japan,245786
Rzeszów,50.0705,22,Poland,245686
Juliaca,-15.5,-70.14,Peru,245675
Qinzhou,21.9504,108.62,China,245376
Winter Haven,28.0122,-81.7018,United States,245237
Nizhenvartovsk,60.935,76.58,Russia,244937
Ternopil,49.536,25.5821,Ukraine,244768
Braunschweig,52.25,10.5,Germany,244715
Norfolk,36.8945,-76.259,United States,244703
Hebi,35.9504,114.22,China,244662
Thu Dau Mot,10.9691,106.6527,Vietnam,244277
Gunsan,35.9818,126.716,"Korea, South",244080
Jessore,23.1704,89.2,Bangladesh,243987
Manisa,38.6304,27.44,Turkey,243971
Wonju,37.3551,127.9396,"Korea, South",243387
Nam Định,20.42,106.2,Vietnam,243186
Angarsk,52.56,103.92,Russia,243158
North Las Vegas,36.288,-115.0901,United States,242975
Hapur,28.7437,77.7628,India,242920
Gilbert,33.3103,-111.7463,United States,242354
Le Havre,49.505,0.105,France,242124
Caruaru,-8.28,-35.98,Brazil,242094
Neuquén,-38.95,-68.06,Argentina,242092
Ulanhot,46.08,122.08,China,241894
Novorossiysk,44.73,37.7699,Russia,241856
Tehuacan,18.4504,-97.38,Mexico,241429
Atlantic City,39.3797,-74.4527,United States,241363
Ivano-Frankivsk,48.9348,24.7094,Ukraine,241239
Linchuan,27.9703,116.36,China,241104
San Pablo,14.0696,121.3226,Philippines,240830
Chesapeake,36.6778,-76.3024,United States,240397
Irving,32.8584,-96.9702,United States,240373
Hialeah,25.8696,-80.3045,United States,239673
Hachinohe,40.51,141.54,Japan,239046
Garland,32.91,-96.6305,United States,238002
Fürth,49.47,11,Germany,237844
As Sib,23.6802,58.1825,Oman,237816
Århus,56.1572,10.2107,Denmark,237551
Sasebo,33.1631,129.7177,Japan,237444
Al Jubayl,27.0046,49.646,Saudi Arabia,237274
Taiping,4.865,100.72,Malaysia,237095
Pathein,16.7704,94.75,Burma,237089
Tegal,-6.8696,109.12,Indonesia,237084
Zicheng,30.3004,111.5,China,237042
Sylhet,24.9036,91.8736,Bangladesh,237000
Oostanay,53.2209,63.6283,Kazakhstan,236901
Košice,48.7304,21.25,Slovakia,236563
Monclova,26.9,-101.42,Mexico,236244
Tours,47.3804,0.6999,France,236096
Dera Ghazi Khan,30.0604,70.6351,Pakistan,236093
Springs,-26.2696,28.43,South Africa,236083
Luton,51.8804,-0.42,United Kingdom,235958
Sahiwal,30.6717,73.1118,Pakistan,235695
Oviedo,43.3505,-5.83,Spain,235651
Yakutsk,62.035,129.735,Russia,235600
Lübeck,53.8704,10.67,Germany,235390
Jizzax,40.1004,67.83,Uzbekistan,235352
Palmas,-10.2377,-48.2878,Brazil,235315
Boa Vista,2.8161,-60.666,Brazil,235150
Kediri,-7.7896,112,Indonesia,235143
McKinney,33.2016,-96.6669,United States,235134
Fremont,37.5265,-121.9852,United States,234962
Kismaayo,-0.3566,42.5183,Somalia,234852
Ibb,13.9759,44.1709,Yemen,234837
Türkmenabat,39.11,63.58,Turkmenistan,234817
Punto Fijo,11.72,-70.21,Venezuela,234736
Porbandar,21.67,69.67,India,234684
Visalia,36.3273,-119.3264,United States,234573
Zacatecas,22.7704,-102.58,Mexico,234481
Santa Ana,13.9946,-89.5598,El Salvador,234478
Santa Ana,-13.76,-65.58,Bolivia,234478
Singaraja,-8.1152,115.0944,Indonesia,234468
Dili,-8.5594,125.5795,Timor-Leste,234331
Nizhnekamsk,55.6404,51.82,Russia,234297
York,39.9651,-76.7315,United States,234245
Zabol,31.0215,61.4815,Iran,233968
Rancagua,-34.17,-70.74,Chile,233268
Clermont-Ferrand,45.78,3.08,France,233050
Kennewick,46.1979,-119.1732,United States,232915
Kremenchuk,49.0835,33.4296,Ukraine,232742
Maradi,13.4916,7.0964,Niger,232555
Ploiești,44.9469,26.0365,Romania,232542
Nakhon Si Thammarat,8.4,99.97,Thailand,232335
Hetauda,27.4167,85.0334,Nepal,232334
Evansville,37.9882,-87.5339,United States,232285
Saidpur,25.8004,89,Bangladesh,232209
Al Fallujah,33.3477,43.7773,Iraq,231819
Shishou,29.7004,112.4,China,231787
Ngaoundéré,7.3204,13.58,Cameroon,231357
Debrecen,47.5305,21.63,Hungary,231286
Osnabrück,52.2804,8.05,Germany,231268
Nashua,42.7491,-71.491,United States,231262
Hailar,49.2,119.7,China,231171
Syktyvkar,61.66,50.82,Russia,230910
Zhangye,38.93,100.45,China,230728
Ilhéus,-14.78,-39.05,Brazil,230622
Santarém,-2.4333,-54.7,Brazil,230428
Zinder,13.8,8.9833,Niger,230358
Nukus,42.47,59.615,Uzbekistan,230006
Magdeburg,52.1304,11.62,Germany,229826
Tlimcen,34.8904,-1.32,Algeria,229777
Noginsk,55.8704,38.48,Russia,229731
Noginsk,64.4833,91.2333,Russia,229731
Nawabshah,26.2454,68.4,Pakistan,229504
Bharatpur,27.2504,77.5,India,229384
Uitenhage,-33.7596,25.39,South Africa,228912
Beipiao,41.81,120.76,China,228515
Er Rachidia,31.9404,-4.45,Morocco,228489
Petropavlovsk,54.88,69.22,Kazakhstan,228238
Miri,4.3999,113.9845,Malaysia,228212
Nassau,25.0834,-77.35,"Bahamas, The",227940
Brownsville,25.998,-97.4565,United States,227883
Iquique,-20.25,-70.13,Chile,227499
Hyeson,41.3927,128.1927,"Korea, North",227461
Pondicherry,11.935,79.83,India,227411
Quillacollo,-17.4,-66.28,Bolivia,227052
Starsy Oskol,51.3004,37.84,Russia,226977
Liaocheng,36.4304,115.97,China,226930
Gusau,12.1704,6.66,Nigeria,226857
Tanjungpinang,0.9168,104.4714,Indonesia,226666
Chon Buri,13.4004,101,Thailand,226618
Chuncheon,37.8747,127.7342,"Korea, South",226509
Monywa,22.105,95.15,Burma,226222
Sabzewar,36.22,57.63,Iran,226183
Groznyy,43.3187,45.6987,Russia,226100
Kolpino,59.73,30.65,Russia,225801
Sikasso,11.3204,-5.68,Mali,225753
Mubi,10.2703,13.27,Nigeria,225705
Novi Sad,45.2504,19.8499,Serbia,225457
Juazeiro do Norte,-7.21,-39.32,Brazil,225230
Nyanza,-2.3496,29.74,Rwanda,225209
Skikda,36.8804,6.9,Algeria,225181
Karnal,29.6804,76.97,India,225049
Bạc Liêu,9.2804,105.72,Vietnam,225000
Matsumoto,36.2404,137.97,Japan,224926
Tanga,-5.07,39.09,Tanzania,224876
Sucre,-19.041,-65.2595,Bolivia,224838
Nacala,-14.5186,40.715,Mozambique,224795
Vitoria,42.85,-2.67,Spain,224578
Nagercoil,8.1804,77.43,India,224329
Nicosia,35.1667,33.3666,Cyprus,224300
Haeju,38.0394,125.7144,"Korea, North",224231
Adıyaman,37.7704,38.2799,Turkey,223744
Okara,30.8104,73.45,Pakistan,223648
Narayanganj,23.6204,90.5,Bangladesh,223622
Colima,19.23,-103.72,Mexico,223287
Appleton,44.2774,-88.3894,United States,222222
Hancheng,35.4704,110.43,China,222135
Arar,30.99,41.0207,Saudi Arabia,222016
Itabuna,-14.7896,-39.28,Brazil,221938
Banja Luka,44.7804,17.18,Bosnia And Herzegovina,221738
Gueckedou,8.554,-10.151,Guinea,221715
Neyshabur,36.22,58.82,Iran,221700
Amol,36.4713,52.3633,Iran,221650
Tapachula,14.9,-92.27,Mexico,221521
Formosa,-26.1728,-58.1828,Argentina,221383
Gulfport,30.4271,-89.0703,United States,221348
Shakhty,47.7204,40.27,Russia,221312
Blagoveshchensk,50.2666,127.5333,Russia,221296
Córdoba,18.9204,-96.92,Mexico,220563
Babruysk,53.1266,29.1928,Belarus,220517
Cabanatuan,15.5021,120.9617,Philippines,220250
Polokwane,-23.89,29.45,South Africa,220045
Lhasa,29.645,91.1,China,219599
Thanjavur,10.7704,79.15,India,219571
Gabès,33.9004,10.1,Tunisia,219517
Baghlan,36.1393,68.6993,Afghanistan,218748
Thousand Oaks,34.1914,-118.8755,United States,218729
Velikiy Novgorod,58.5,31.33,Russia,218717
Wuhai,39.6647,106.8122,China,218427
Dodoma,-6.1833,35.75,Tanzania,218269
Bertoua,4.5804,13.68,Cameroon,218111
Imperatriz,-5.52,-47.49,Brazil,218106
Potsdam,52.4004,13.07,Germany,218095
San Pedro de Macorís,18.4504,-69.3,Dominican Republic,217899
Mallawi,27.7304,30.84,Egypt,217365
Sibolga,1.75,98.8,Indonesia,217312
Orléans,47.9004,1.9,France,217301
Denow,38.2772,67.8872,Uzbekistan,217274
Avondale,33.3858,-112.3236,United States,217192
Colombo,6.932,79.8578,Sri Lanka,217000
San Bernardino,34.1412,-117.2936,United States,216995
Gilgit,35.9171,74.3,Pakistan,216760
Rybinsk,58.0503,38.82,Russia,216724
Groningen,53.2204,6.58,Netherlands,216688
Bremerton,47.5436,-122.7122,United States,216480
Roanoke,37.2785,-79.958,United States,216177
Trieste,45.6504,13.8,Italy,216035
Kielce,50.8904,20.66,Poland,215733
Mulhouse,47.7504,7.35,France,215454
Biysk,52.5341,85.18,Russia,215430
Hickory,35.7427,-81.3233,United States,215353
Owerri,5.493,7.026,Nigeria,215038
Zamora,19.9804,-102.28,Mexico,214947
Navoi,40.1104,65.355,Uzbekistan,214828
Split,43.5204,16.47,Croatia,214741
Kalamazoo,42.2749,-85.5881,United States,214083
Oradea,47.05,21.92,Romania,213830
Lutsk,50.7472,25.3334,Ukraine,213661
Portoviejo,-1.06,-80.46,Ecuador,213601
Bergen,60.391,5.3245,Norway,213585
Brăila,45.292,27.969,Romania,213569
Tacoma,47.2431,-122.4531,United States,213418
Nanping,26.6304,118.17,China,213054
Machala,-3.26,-79.96,Ecuador,213034
Limbe,4.0304,9.19,Cameroon,212474
Marília,-22.21,-49.95,Brazil,212218
Fontana,34.0968,-117.4599,United States,211815
Kırıkkale,39.8504,33.53,Turkey,211138
Abha,18.2301,42.5001,Saudi Arabia,210886
San-Pedro,4.7704,-6.64,Côte D’Ivoire,210273
Toamasina,-18.1818,49.405,Madagascar,210226
Pali,25.7904,73.3299,India,210103
Thái Bình,20.4503,106.333,Vietnam,210000
Oral,51.2711,51.335,Kazakhstan,209788
Presidente Prudente,-22.12,-51.39,Brazil,209502
Sanming,26.23,117.58,China,209444
Rennes,48.1,-1.67,France,209375
Ijebu Ode,6.8204,3.92,Nigeria,209175
Tema,5.6404,0.01,Ghana,209000
Santander,43.3805,-3.8,Spain,208763
Green Bay,44.515,-87.9896,United States,208625
Sidi bel Abbes,35.1903,-0.64,Algeria,208604
Bojnurd,37.47,57.32,Iran,208582
La Romana,18.417,-68.9666,Dominican Republic,208437
Gaborone,-24.6463,25.9119,Botswana,208411
Hajjah,15.6917,43.6021,Yemen,208287
Waitakere,-36.8524,174.5543,New Zealand,208100
Lobito,-12.37,13.5412,Angola,207932
College Station,30.5852,-96.296,United States,207308
Pingliang,35.5304,106.6801,China,207256
Moreno Valley,33.9244,-117.2045,United States,207226
Laoag,18.1988,120.5936,Philippines,207048
Bahir Dar,11.6001,37.3833,Ethiopia,206748
Yamoussoukro,6.8184,-5.2755,Côte D’Ivoire,206499
Beer Sheva,31.25,34.83,Israel,206408
Korla,41.73,86.15,China,206373
Salzburg,47.8105,13.04,Austria,206279
Kalemie,-5.9333,29.2,Congo (Kinshasa),206257
Amarillo,35.1988,-101.8308,United States,206072
Portland,43.6773,-70.2715,United States,206023
North Shore,-36.7913,174.7758,New Zealand,205605
Jiutai,44.1447,125.8443,China,205399
Campeche,19.83,-90.5,Mexico,205212
Puqi,29.7204,113.88,China,205164
São Carlos,-22.02,-47.89,Brazil,205035
Fargo,46.8653,-96.8292,United States,204820
Funchal,32.65,-16.88,Portugal,204767
Criciúma,-28.68,-49.39,Brazil,204217
Lampang,18.2916,99.4813,Thailand,204081
Santa Barbara,34.4285,-119.7202,United States,204034
Colón,9.365,-79.875,Panama,204000
Norwich,41.5495,-72.0882,United States,203916
Salalah,17.0255,54.0852,Oman,203877
Sibu,2.303,111.843,Malaysia,203832
Las Tunas,20.9601,-76.9544,Cuba,203684
Lianxian,24.7815,112.3825,China,203639
Guaratinguetá,-22.82,-45.19,Brazil,203580
Pisa,43.7205,10.4,Italy,203336
Agartala,23.8354,91.28,India,203264
Erfurt,50.9701,11.03,Germany,203254
Timon,-5.115,-42.845,Brazil,203157
Edéa,3.8005,10.12,Cameroon,203149
Rostock,54.0704,12.15,Germany,203080
Glendale,34.1818,-118.2468,United States,203054
Ongole,15.5604,80.05,India,202860
Djougou,9.7004,1.68,Benin,202810
Khvoy,38.5304,44.97,Iran,202728
Mossoró,-5.19,-37.34,Brazil,202583
Barisal,22.7004,90.375,Bangladesh,202242
Biskra,34.86,5.73,Algeria,202103
Angren,41.0304,70.1549,Uzbekistan,202070
Taranto,40.5084,17.23,Italy,202033
Yonkers,40.9466,-73.8674,United States,202019
Pskov,57.83,28.3299,Russia,201990
Al Khums,32.6604,14.26,Libya,201943
Minatitlán,17.9805,-94.53,Mexico,201902
Huntington Beach,33.696,-118.0025,United States,201874
Chiniot,31.72,72.98,Pakistan,201781
Pingzhen,24.9439,121.2161,Taiwan,201632
San Miguel,13.4833,-88.1833,El Salvador,201563
Lashkar Gah,31.583,64.36,Afghanistan,201546
Daşoguz,41.84,59.965,Turkmenistan,201424
Sete Lagoas,-19.4496,-44.25,Brazil,201334
Gedaref,14.04,35.38,Sudan,201282
Cartagena,37.6004,-0.98,Spain,201274
Puri,19.8204,85.9,India,201026
Aurora,41.7638,-88.2901,United States,200965
Dindigul,10.38,78,India,200797
Haldia,22.0257,88.0583,India,200762
Kasama,-10.1996,31.1799,Zambia,200000
Moratuwa,6.7804,79.88,Sri Lanka,200000
Az Zawiyah,32.7604,12.72,Libya,200000
Nema,16.6171,-7.25,Mauritania,200000
Pokhara,28.264,83.972,Nepal,200000
Zhubei,24.8333,121.0119,Taiwan,200000
Rivera,-30.8996,-55.56,Uruguay,200000
Bergamo,45.7004,9.67,Italy,200000
Meymaneh,35.9302,64.7701,Afghanistan,199795
Gainesville,29.6808,-82.3455,United States,199695
Bacău,46.5784,26.9196,Romania,199668
Taza,34.2204,-4.02,Morocco,199633
Batu Pahat,1.8504,102.9333,Malaysia,199619
Balakovo,52.03,47.8,Russia,199572
Armavir,45.0004,41.13,Russia,199548
Rashid,31.4604,30.39,Egypt,199509
Bila Tserkva,49.7743,30.1309,Ukraine,199163
Saskatoon,52.17,-106.67,Canada,198958
Aydın,37.85,27.85,Turkey,198857
Huangyan,28.65,121.25,China,198713
Bulandshahr,28.4104,77.8484,India,198612
Kushiro,42.975,144.3747,Japan,198566
Purnia,25.7854,87.48,India,198453
Martapura,-3.4135,114.8365,Indonesia,198239
Gemena,3.26,19.77,Congo (Kinshasa),198056
Thanh Hóa,19.82,105.8,Vietnam,197551
Mbanza-Ngungu,-5.2496,14.86,Congo (Kinshasa),197545
Kōfu,35.6504,138.5833,Japan,197540
Salamanca,20.5704,-101.2,Mexico,197524
Talca,-35.455,-71.67,Chile,197479
Proddatur,14.7504,78.57,India,197451
El Tigre,8.8903,-64.26,Venezuela,197440
Gurgaon,28.45,77.02,India,197340
Burhanpur,21.3004,76.13,India,197233
Kure,34.251,132.5656,Japan,196991
Cartago,9.87,-83.93,Costa Rica,196946
Porlamar,10.9604,-63.85,Venezuela,196934
Reims,49.2504,4.03,France,196565
Olympia,47.0418,-122.8959,United States,196078
Engels,51.5004,46.12,Russia,196011
North Port,27.0577,-82.1976,United States,195992
Burgas,42.5146,27.4746,Bulgaria,195966
Gandhinagar,23.3004,72.6399,India,195891
Iskandar,41.5507,69.6807,Uzbekistan,195633
Nagaoka,37.4504,138.86,Japan,195318
Coro,11.42,-69.68,Venezuela,195227
Brikama,13.2804,-16.6599,"Gambia, The",195136
Severodvinsk,64.57,39.83,Russia,194292
Al Jahra,29.3375,47.6581,Kuwait,194193
Huntington,38.4109,-82.4344,United States,194155
Deltona,28.905,-81.2136,United States,194061
Bongor,10.2859,15.3872,Chad,193941
Grand Prairie,32.6869,-97.0209,United States,193837
Divinópolis,-20.1495,-44.9,Brazil,193832
Salinas,36.6881,-121.6316,United States,193590
Tarakan,3.3,117.633,Indonesia,193069
Machilipatnam,16.2004,81.18,India,192827
Oxford,51.7704,-1.25,United Kingdom,192796
Ciudad Madero,22.3189,-97.8361,Mexico,192736
Bayamo,20.3795,-76.6433,Cuba,192632
Klaipėda,55.7204,21.1199,Lithuania,192307
Dunhua,43.3505,128.22,China,191870
Ziguinchor,12.59,-16.29,Senegal,191716
Waterbury,41.5583,-73.0361,United States,191484
Barrancabermeja,7.09,-73.85,Colombia,191403
Zlatoust,55.175,59.65,Russia,191366
Muar,2.0337,102.5666,Malaysia,191346
Overland Park,38.887,-94.687,United States,191278
Dhamar,14.5575,44.3875,Yemen,191259
Valera,9.32,-70.62,Venezuela,191167
Bridgetown,13.102,-59.6165,Barbados,191152
Bhiwani,28.81,76.125,India,190855
Norwich,52.6304,1.3,United Kingdom,190756
Butuan,8.9495,125.5436,Philippines,190557
Caen,49.1838,-0.35,France,190099
St.-Denis,-20.8789,55.4481,Reunion,190047
Sadiqabad,28.3006,70.1302,Pakistan,189876
La Paz,24.14,-110.32,Mexico,189767
Sơn Tây,21.1382,105.505,Vietnam,189547
Aberdeen,57.1704,-2.08,United Kingdom,189364
Syzran,53.17,48.48,Russia,189338
Đồng Hới,17.4833,106.6,Vietnam,189265
Mwene-Ditu,-7,23.44,Congo (Kinshasa),189177
Kabwe,-14.44,28.45,Zambia,188979
Quelimane,-17.88,36.89,Mozambique,188964
Cork,51.8986,-8.4958,Ireland,188907
Parakou,9.34,2.62,Benin,188853
Catamarca,-28.47,-65.78,Argentina,188812
Nandyal,15.5204,78.48,India,188654
Waco,31.5597,-97.1883,United States,188448
Angers,47.48,-0.53,France,188380
Mostaganem,35.9404,0.09,Algeria,188354
Erie,42.1168,-80.0733,United States,188079
Paarl,-33.6996,18.96,South Africa,187865
Rio Grande,-32.0495,-52.12,Brazil,187838
Szeged,46.2504,20.15,Hungary,187765
Arapiraca,-9.75,-36.67,Brazil,187668
Ternate,0.793,127.363,Indonesia,187521
Petropavlovsk Kamchatskiy,53.062,158.623,Russia,187282
Kimchaek,40.6723,129.2027,"Korea, North",187270
Puerto Vallarta,20.6771,-105.245,Mexico,187134
Gibraltar,36.1324,-5.3781,Gibraltar,187083
Cachoeiro de Itapemirim,-20.85,-41.13,Brazil,187019
Pinar del Rio,22.4175,-83.6981,Cuba,186990
Manpo,41.1454,126.2958,"Korea, North",186827
Olsztyn,53.8,20.48,Poland,186670
San Cristobal de Las Casas,16.75,-92.6334,Mexico,186661
Cienfuegos,22.1444,-80.4403,Cuba,186644
Shendi,16.6805,33.42,Sudan,186611
Pécs,46.0804,18.22,Hungary,186262
Cedar Rapids,41.9667,-91.6782,United States,186160
Marbella,36.5166,-4.8833,Spain,186131
Madiun,-7.6346,111.515,Indonesia,186099
Ad Damazīn,11.7704,34.35,Sudan,186051
Arica,-18.5,-70.29,Chile,185999
Hagerstown,39.6401,-77.7217,United States,185704
Jamaame,0.0722,42.7506,Somalia,185270
Tempe,33.3881,-111.9318,United States,185038
Kütahya,39.42,29.93,Turkey,185008
Yei,4.0904,30.68,South Sudan,185000
Mainz,49.9825,8.2732,Germany,184997
Ruse,43.8537,25.9733,Bulgaria,184270
Tiarat,35.3804,1.32,Algeria,184195
Fianarantsoa,-21.4333,47.0833,Madagascar,184184
Kramatorsk,48.7194,37.5344,Ukraine,184105
Kutaisi,42.25,42.73,Georgia,183945
Tarlac,15.4838,120.5834,Philippines,183930
Dese,11.13,39.63,Ethiopia,183802
Corum,40.52,34.95,Turkey,183418
Gweru,-19.45,29.82,Zimbabwe,183358
Mataró,41.54,2.45,Spain,183293
Spartanburg,34.9437,-81.9257,United States,183184
Manta,-0.98,-80.73,Ecuador,183166
Bhusawal,21.02,75.83,India,183001
Shibin el Kom,30.592,30.9,Egypt,182900
Clarksville,36.5696,-87.3428,United States,182849
Atyrau,47.1127,51.92,Kazakhstan,182753
Pinrang,-3.7857,119.6522,Indonesia,182731
Kamensk Uralskiy,56.4205,61.935,Russia,182500
Chilpancingo,17.55,-99.5,Mexico,182387
Biratnagar,26.4837,87.2833,Nepal,182324
Bahraich,27.6204,81.6699,India,182218
Barrie,44.3838,-79.7,Canada,182041
Chingola,-12.5396,27.85,Zambia,182015
Tonk,26.1505,75.79,India,181734
Probolinggo,-7.7496,113.15,Indonesia,181656
Sirsa,29.4904,75.03,India,181639
Anda,46.4,125.32,China,181533
Gastonia,35.2494,-81.1855,United States,180974
Hinthada,17.6483,95.4679,Burma,180728
Gangneung,37.7559,128.8962,"Korea, South",180611
Castello,39.9704,-0.05,Spain,180610
Funtua,11.5204,7.32,Nigeria,180475
El Jadida,33.2604,-8.51,Morocco,180470
Reggio di Calabria,38.115,15.6414,Italy,180353
Zuwarah,32.9344,12.0791,Libya,180310
Lorain,41.4409,-82.184,United States,180239
Sioux Falls,43.5397,-96.7322,United States,180204
Rio Claro,-22.41,-47.56,Brazil,180147
Tangail,24.25,89.92,Bangladesh,180144
Obuasi,6.1904,-1.66,Ghana,180117
Fort Lauderdale,26.1412,-80.1464,United States,180072
Zhaodong,46.0804,125.98,China,179980
Balkh,36.7501,66.8997,Afghanistan,179969
Potosí,-19.5696,-65.75,Bolivia,179901
Phan Rang,11.567,108.9833,Vietnam,179773
Varamin,35.3166,51.6466,Iran,179603
Passo Fundo,-28.25,-52.42,Brazil,179529
Almería,36.8303,-2.43,Spain,179405
Newport News,37.1051,-76.5185,United States,179388
Vizianagaram,18.1204,83.5,India,179358
Sittwe,20.14,92.88,Burma,179032
Klerksdorp,-26.88,26.62,South Africa,178921
Si Racha,13.159,100.9287,Thailand,178916
Mary,37.6,61.8333,Turkmenistan,178708
El Arish,31.1249,33.8006,Egypt,178651
Boma,-5.83,13.05,Congo (Kinshasa),178638
Sangolquí,-0.31,-78.46,Ecuador,178582
Nogales,31.305,-110.945,Mexico,178097
High Point,35.9902,-79.9938,United States,177874
Teziutlán,19.8204,-97.36,Mexico,177796
Korhogo,9.46,-5.64,Côte D’Ivoire,177711
Termiz,37.2329,67.2729,Uzbekistan,177687
Ar Raqqah,35.9304,39.02,Syria,177636
Santa Cruz,36.9788,-122.0346,United States,177556
El Oued,33.3704,6.86,Algeria,177497
Rancho Cucamonga,34.1247,-117.5664,United States,177452
Treviso,45.67,12.24,Italy,177309
Frisco,33.1553,-96.8218,United States,177286
Danbury,41.4016,-73.471,United States,177177
Vellore,12.9204,79.15,India,177081
Kadugli,11.01,29.7,Sudan,176931
Hemet,33.7341,-116.9969,United States,176892
Nyíregyháza,47.9653,21.7187,Hungary,176880
Alappuzha,9.5004,76.37,India,176783
Malayer,34.32,48.85,Iran,176573
Letpadan,17.7819,95.7415,Burma,176571
Yuzhno Sakhalinsk,46.965,142.74,Russia,176484
Ouargla,31.97,5.34,Algeria,176271
Oceanside,33.2247,-117.3083,United States,176193
Regina,50.45,-104.617,Canada,176183
Salatiga,-7.3095,110.4901,Indonesia,176000
Turku,60.4539,22.255,Finland,175945
Ontario,34.0393,-117.6064,United States,175841
Vancouver,45.6352,-122.597,United States,175673
Saveh,35.0218,50.3314,Iran,175533
Modena,44.65,10.92,Italy,175502
Les Cayes,18.2004,-73.75,Haiti,175457
Suva,-18.133,178.4417,Fiji,175399
Bose,23.8997,106.6133,China,175282
Entebbe,0.0604,32.46,Uganda,175128
Yangmei,24.9167,121.15,Taiwan,175000
Taitung,22.7554,121.14,Taiwan,175000
Sirjan,29.47,55.73,Iran,175000
Harar,9.32,42.15,Ethiopia,174994
As Samawah,31.3099,45.2803,Iraq,174978
Hirosaki,40.57,140.47,Japan,174972
Tomakomai,42.6504,141.55,Japan,174806
Puerto Montt,-41.47,-72.93,Chile,174629
George,-33.95,22.45,South Africa,174582
Bo,7.97,-11.74,Sierra Leone,174354
Garden Grove,33.7787,-117.9601,United States,174226
Puerto Cabello,10.4704,-68.17,Venezuela,174000
Saida,33.563,35.3688,Lebanon,173894
Obihiro,42.9304,143.17,Japan,173890
Nampa,43.5843,-116.5626,United States,173863
Bida,9.0804,6.01,Nigeria,173849
Vallejo,38.1133,-122.2359,United States,173844
Simla,31.1,77.1666,India,173503
Stavanger,58.97,5.68,Norway,173132
Esmeraldas,0.9304,-79.67,Ecuador,173101
Bata,1.87,9.77,Equatorial Guinea,173046
Ulm,48.4004,10,Germany,172955
Hong Gai,20.9604,107.1,Vietnam,172915
Lishui,28.4504,119.9,China,172777
Riobamba,-1.67,-78.65,Ecuador,172464
Banyuwangi,-8.195,114.3696,Indonesia,172424
Isparta,37.77,30.53,Turkey,172334
Weinan,34.5004,109.5001,China,172321
Bade,24.9575,121.2989,Taiwan,172065
Nova Friburgo,-22.26,-42.54,Brazil,171991
Elk Grove,38.416,-121.384,United States,171844
Tébessa,35.4104,8.12,Algeria,171742
Kragujevac,44.02,20.92,Serbia,171197
Pitești,44.8563,24.8758,Romania,171021
Rijeka,45.33,14.45,Croatia,170992
Djelfa,34.68,3.25,Algeria,170901
Pembroke Pines,26.0128,-80.3387,United States,170712
Temirtau,50.065,72.965,Kazakhstan,170600
Uvira,-3.37,29.14,Congo (Kinshasa),170391
Burgos,42.3504,-3.68,Spain,170183
Takaoka,36.67,137,Japan,170077
Araçatuba,-21.21,-50.45,Brazil,170024
Fuyang,32.9004,115.82,China,170023
Čačak,43.8897,20.3301,Serbia,170000
Dijon,47.3304,5.03,France,169946
Keluang,2.0383,103.3179,Malaysia,169828
Nîmes,43.8304,4.35,France,169547
Al Marj,32.5005,20.83,Libya,169540
Barra Mansa,-22.56,-44.17,Brazil,169386
Jayapura,-2.533,140.7,Indonesia,169341
Sarh,9.15,18.39,Chad,169196
Medinipur,22.3304,87.15,India,169127
Arad,46.17,21.32,Romania,169065
Bandar-e Bushehr,28.92,50.83,Iran,169060
Sonsonate,13.72,-89.73,El Salvador,168947
Baranavichy,53.1368,26.0134,Belarus,168772
Atbara,17.71,33.98,Sudan,168612
Würzburg,49.8004,9.95,Germany,168561
Hindupur,13.7804,77.49,India,168312
Medford,42.3372,-122.8537,United States,168219
Peoria,33.7844,-112.2989,United States,168181
Nzérékoré,7.76,-8.83,Guinea,168121
Baramula,34.2004,74.35,India,167986
Jamalpur,24.9004,89.95,Bangladesh,167900
Chirchiq,41.455,69.56,Uzbekistan,167842
Corona,33.862,-117.5644,United States,167836
Berezniki,59.42,56.76,Russia,167748
Volgodonsk,47.51,42.1599,Russia,167731
Ormac,11.0643,124.6075,Philippines,167584
Miass,54.9954,60.0949,Russia,167500
Oldenburg,53.13,8.22,Germany,167458
Abakan,53.7037,91.445,Russia,167289
Murfreesboro,35.8493,-86.4098,United States,167055
Benha,30.4667,31.1833,Egypt,167029
Novocherkassk,47.42,40.08,Russia,166974
Gonaïves,19.4504,-72.6832,Haiti,166678
Marysville,48.0809,-122.1558,United States,166541
Fatehpur,25.8804,80.8,India,166480
Dibrugarh,27.4833,94.9,India,166366
Ayacucho,-13.175,-74.22,Peru,166314
Reykjavík,64.15,-21.95,Iceland,166212
Marabá,-5.35,-49.116,Brazil,166182
Ocumare del Tuy,10.12,-66.78,Venezuela,166072
San Fernando,10.2805,-61.4594,Trinidad And Tobago,166039
Parma,44.8104,10.32,Italy,166011
Rustenburg,-25.65,27.24,South Africa,165976
Cary,35.7814,-78.8167,United States,165904
Norilsk,69.34,88.225,Russia,165873
Carpina,-7.84,-35.26,Brazil,165579
Tuluá,4.0904,-76.21,Colombia,165501
Livingstone,-17.86,25.86,Zambia,165480
Hà Tĩnh,18.3338,105.9,Vietnam,165396
Kendari,-3.9553,122.5973,Indonesia,165377
Kimberley,-28.7468,24.77,South Africa,165264
Elbasan,41.1215,20.0838,Albania,165010
Nantou,23.9167,120.6833,Taiwan,165000
Fredericksburg,38.2992,-77.4872,United States,164976
Serang,-6.11,106.1496,Indonesia,164767
Ocala,29.1803,-82.1495,United States,164712
Lajes,-27.8096,-50.31,Brazil,164676
León,12.4356,-86.8794,Nicaragua,164441
Sitapur,27.63,80.75,India,164435
Zenica,44.22,17.92,Bosnia And Herzegovina,164423
Regensburg,49.0204,12.12,Germany,164359
Kigoma,-4.8796,29.61,Tanzania,164268
Pizen,49.7404,13.36,Czechia,164180
Phitsanulok,16.8283,100.2729,Thailand,164017
Myingyan,21.4618,95.3914,Burma,163812
Dagupan,16.0479,120.3408,Philippines,163676
Patra,38.23,21.73,Greece,163360
Ingolstadt,48.7704,11.45,Germany,163325
La Vega,19.2166,-70.5166,Dominican Republic,163197
Mostar,43.3505,17.82,Bosnia And Herzegovina,163067
Navsari,20.8504,72.92,India,163000
Geneina,13.45,22.44,Sudan,162981
Tartus,34.8846,35.8866,Syria,162980
Simao,22.7807,100.9782,China,162725
La Rioja,-29.41,-66.85,Argentina,162620
Lecce,40.3604,18.15,Italy,162582
Mahabad,36.7704,45.72,Iran,162434
Salamanca,40.9704,-5.67,Spain,162353
Dourados,-22.23,-54.81,Brazil,162202
Ash Shatrah,31.4175,46.1772,Iraq,161949
Settat,33.0104,-7.62,Morocco,161748
Budaun,28.03,79.09,India,161555
Tunja,5.5504,-73.37,Colombia,161412
Coquimbo,-29.9529,-71.3436,Chile,161317
Rubtsovsk,51.52,81.21,Russia,161065
Bhisho,-32.87,27.39,South Africa,160997
Geelong,-38.1675,144.3956,Australia,160991
Ras al Khaymah,25.7915,55.9428,United Arab Emirates,160849
Sullana,-4.8896,-80.68,Peru,160789
Malakal,9.5369,31.656,South Sudan,160765
Manchester,42.9848,-71.4447,United States,160742
Bumba,2.19,22.46,Congo (Kinshasa),160539
Hayward,37.6328,-122.0772,United States,160500
Xiaogan,30.9204,113.9,China,160437
Xapeco,-27.1,-52.64,Brazil,160157
Muskegon,43.2281,-86.2562,United States,160142
Taunggyi,20.782,97.038,Burma,160115
Lázaro Cárdenas,17.9587,-102.2,Mexico,160087
Alexandria,38.8185,-77.0861,United States,160035
Gonbad-e Kavus,37.2518,55.1715,Iran,159982
Salavat,53.3703,55.93,Russia,159893
Valdivia,-39.795,-73.245,Chile,159599
Pagadian,7.853,123.507,Philippines,159590
Nakhodka,42.8374,132.8874,Russia,159551
Nakhodka,67.7504,77.52,Russia,159551
Springfield,39.7712,-89.6539,United States,159394
Lafayette,40.3991,-86.8594,United States,159293
Tarija,-21.5167,-64.75,Bolivia,159269
Zarzis,33.5104,11.1,Tunisia,159161
Punta del Este,-34.97,-54.95,Uruguay,159000
York,53.9704,-1.08,United Kingdom,158947
Cuddalore,11.7204,79.77,India,158569
Rio Largo,-9.48,-35.84,Brazil,158545
Samarra,34.194,43.875,Iraq,158508
Maykop,44.61,40.12,Russia,158451
Abéché,13.84,20.83,Chad,158317
Barreiras,-12.14,-45,Brazil,158292
Odense,55.4004,10.3833,Denmark,158222
Huánuco,-9.92,-76.24,Peru,158145
Hoshiarpur,31.52,75.98,India,158142
Albacete,39.0003,-1.87,Spain,158094
Melitopol,46.8378,35.3775,Ukraine,158000
Sobral,-3.69,-40.35,Brazil,157996
Port Arthur,29.8554,-93.9264,United States,157934
Sudbury,46.5,-80.9666,Canada,157857
Surat Thani,9.1501,99.3401,Thailand,157627
Palmdale,34.5944,-118.1057,United States,157519
Hurghada,27.23,33.83,Egypt,157204
Isiro,2.76,27.62,Congo (Kinshasa),157196
Puerto Princesa,9.7543,118.7444,Philippines,157144
Kashmar,35.1814,58.4515,Iran,157135
Ussuriysk,43.8,132.02,Russia,157068
Rustavi,41.5704,45.05,Georgia,157063
Tiraspol,46.8531,29.64,Moldova,157000
Afyon,38.7504,30.55,Turkey,156992
Zonguldak,41.4304,31.78,Turkey,156918
Matsue,35.467,133.0666,Japan,156811
Champaign,40.1144,-88.2735,United States,156794
Moundou,8.55,16.09,Chad,156705
Dali,25.7,100.18,China,156685
Koforidua,6.0904,-0.26,Ghana,156653
Uroteppa,39.9219,69.0015,Tajikistan,156621
Livorno,43.5511,10.3023,Italy,156274
Gainesville,34.2901,-83.8301,United States,156248
Gondar,12.61,37.46,Ethiopia,156230
Ciudad del Carmen,18.6537,-91.8245,Mexico,156195
Malabo,3.75,8.7833,Equatorial Guinea,155963
Yulin,38.2833,109.7333,China,155960
Shkodër,42.0685,19.5188,Albania,155767
Muroran,42.35,140.98,Japan,155676
Sibiu,45.7971,24.1371,Romania,155565
Batumi,41.6,41.63,Georgia,155542
Barysaw,54.226,28.4922,Belarus,155389
Gyeongju,35.8428,129.2117,"Korea, South",155237
Innsbruck,47.2804,11.41,Austria,155214
Foggia,41.4605,15.56,Italy,155203
Ordu,41.0004,37.8699,Turkey,155117
Kanchipuram,12.8337,79.7167,India,155029
Frederick,39.4335,-77.4157,United States,154972
Lakewood,39.6978,-105.1168,United States,154958
Sariwon,38.507,125.762,"Korea, North",154942
Beian,48.239,126.482,China,154936
Battambang,13.1,103.2,Cambodia,154773
Guangshui,31.6204,114,China,154771
Middelburg,-25.7596,29.47,South Africa,154706
Mahajanga,-15.67,46.345,Madagascar,154657
La Serena,-29.9,-71.25,Chile,154521
Chetumal,18.5,-88.3,Mexico,154517
Gandajika,-6.7396,23.96,Congo (Kinshasa),154425
Pathum Thani,14.0171,100.5333,Thailand,154412
Cairns,-16.8878,145.7633,Australia,154225
Kovrov,56.3604,41.33,Russia,154224
Tuscaloosa,33.2349,-87.5267,United States,154204
Osorno,-40.57,-73.16,Chile,154131
Tottori,35.5004,134.2333,Japan,154098
San Cristóbal,18.416,-70.109,Dominican Republic,154040
Lemosos,34.6754,33.0333,Cyprus,154000
Moanda,-5.9229,12.355,Congo (Kinshasa),153915
Río Cuarto,-33.13,-64.35,Argentina,153757
Masjed Soleyman,31.98,49.2999,Iran,153663
Sunnyvale,37.3835,-122.0257,United States,153656
Lake Charles,30.203,-93.215,United States,153633
Hollywood,26.0293,-80.1678,United States,153627
Mufulira,-12.55,28.26,Zambia,153624
Pasadena,29.6584,-95.1499,United States,153520
Chincha Alta,-13.4196,-76.14,Peru,153076
Faizabad,26.7504,82.17,India,153047
Pomona,34.0585,-117.7625,United States,152939
Kansas City,39.1234,-94.7443,United States,152938
Dingzhou,38.5004,115,China,152934
Rondonópolis,-16.4695,-54.64,Brazil,152912
Ilam,33.6304,46.43,Iran,152894
Uşak,38.6804,29.42,Turkey,152862
Nusaybin,37.075,41.2184,Turkey,152668
San Francisco de Macorís,19.3,-70.25,Dominican Republic,152538
Zabīd,14.1951,43.3155,Yemen,152504
Silchar,24.7904,92.79,India,152393
Wenshan,23.3724,104.2497,China,152388
Novokuybishevsk,53.12,49.9199,Russia,152334
Mudon,16.2618,97.7215,Burma,152300
Limoges,45.83,1.25,France,152199
Deyang,31.1333,104.4,China,152194
Samalut,28.3004,30.71,Egypt,152097
Luanshya,-13.1333,28.4,Zambia,151993
Escondido,33.1347,-117.0722,United States,151969
El Manaqil,14.2504,32.98,Sudan,151827
Abbotsford,49.0504,-122.3,Canada,151683
Guanare,9.05,-69.75,Venezuela,151642
Bintulu,3.1664,113.036,Malaysia,151617
Dundee,56.4704,-3,United Kingdom,151592
Nazareth,32.704,35.2955,Israel,151459
Maragheh,37.4204,46.22,Iran,151385
Bălți,47.7591,27.9053,Moldova,151355
Suhar,24.362,56.7344,Oman,151349
Benguela,-12.5783,13.4072,Angola,151226
Guarapuava,-25.38,-51.48,Brazil,150850
Uzhgorod,48.63,22.25,Ukraine,150832
Binghamton,42.1014,-75.9093,United States,150747
Kitale,1.0305,34.9899,Kenya,150495
Chillán,-36.6,-72.106,Chile,150396
Urgentch,41.56,60.64,Uzbekistan,150110
Vryheid,-27.76,30.79,South Africa,150012
Pattani,6.864,101.25,Thailand,150000
Miaoli,24.57,120.82,Taiwan,150000
Yilan,24.75,121.75,Taiwan,150000
Tororo,0.7104,34.17,Uganda,150000
M'sila,35.7,4.545,Algeria,150000
Keren,15.6804,38.45,Eritrea,150000
Cao Lãnh,10.467,105.636,Vietnam,149837
Khiwa,41.3911,60.3557,Uzbekistan,149751
Carora,10.19,-70.08,Venezuela,149711
Warner Robins,32.598,-83.6528,United States,149617
New Bedford,41.6697,-70.9428,United States,149528
Tirgu Mures,46.5582,24.5578,Romania,149433
Perugia,43.1104,12.39,Italy,149125
Gejiu,23.38,103.1501,China,149105
Topeka,39.0346,-95.6956,United States,148960
Beaumont,30.0849,-94.1451,United States,148954
Paterson,40.9147,-74.1624,United States,148678
Joliet,41.5193,-88.1501,United States,148462
Gyumri,40.7894,43.8475,Armenia,148381
Palangkaraya,-2.2096,113.91,Indonesia,148289
Jiayuguan,39.82,98.3,China,148279
Hamilton,-37.7783,175.2896,New Zealand,148200
Leesburg,28.7674,-81.8981,United States,148161
Yala,6.5505,101.2851,Thailand,148140
Elkhart,41.6913,-85.9628,United States,148131
Diourbel,14.6604,-16.24,Senegal,148024
Lạng Sơn,21.846,106.757,Vietnam,148000
Jijel,36.822,5.766,Algeria,148000
Trang,7.5634,99.608,Thailand,147820
Odessa,31.8831,-102.3407,United States,147810
Turbat,25.9918,63.0718,Pakistan,147791
Médéa,36.2704,2.77,Algeria,147707
Kolomna,55.08,38.785,Russia,147690
Naperville,41.7483,-88.1657,United States,147682
Fairfield,38.2594,-122.0319,United States,147582
San Juan del Río,20.38,-100,Mexico,147559
Mangyshlak,43.6905,51.1417,Kazakhstan,147443
El Progreso,14.85,-90.0167,Guatemala,147197
Trondheim,63.4167,10.4167,Norway,147139
Man,7.4004,-7.55,Côte D’Ivoire,146974
Wamba,2.1404,27.99,Congo (Kinshasa),146871
Gulu,2.78,32.28,Uganda,146858
Aix-en-Provence,43.52,5.45,France,146821
Willemstad,12.2004,-69.02,Curaçao,146813
Gharyan,32.1704,13.02,Libya,146810
Ambala,30.32,76.82,India,146787
Cam Ranh,11.902,109.2207,Vietnam,146771
Torrance,33.8346,-118.3417,United States,146758
Ibarra,0.3604,-78.13,Ecuador,146741
Matanzas,23.0415,-81.5775,Cuba,146733
Perpignan,42.7,2.9,France,146620
Poços de Caldas,-21.78,-46.57,Brazil,146588
Tabora,-5.02,32.8,Tanzania,146495
Dar'a,32.625,36.105,Syria,146481
Brugge,51.2204,3.23,Belgium,146469
Cabo de Santo Agostinho,-8.29,-35.03,Brazil,146219
Dawei,14.098,98.195,Burma,146212
Hanzhong,33.13,107.03,China,145986
La Ceiba,15.7631,-86.797,Honduras,145926
Krishnanagar,23.3803,88.53,India,145926
Podgorica,42.466,19.2663,Montenegro,145850
Ayutthaya,14.3588,100.5684,Thailand,145615
Quchan,37.1118,58.5015,Iran,145531
Pointe-à-Pitre,16.2415,-61.533,Guadeloupe,145511
Biarritz,43.4733,-1.5616,France,145348
Los Angeles,-37.46,-72.36,Chile,145239
Panama City,30.1997,-85.6003,United States,145239
Concordia,-31.3896,-58.03,Argentina,145210
Machakos,-1.5095,37.26,Kenya,144925
Brest,48.3904,-4.495,France,144899
Kolar,13.1337,78.1334,India,144625
Qairouan,35.6804,10.1,Tunisia,144522
Le Mans,48.0004,0.1,France,144515
Tall Afar,36.376,42.4497,Iraq,144465
Bellevue,47.5953,-122.1551,United States,144444
Kumba,4.6404,9.44,Cameroon,144413
Jinchang,38.4957,102.1739,China,144363
Tuzla,44.5505,18.68,Bosnia And Herzegovina,144334
Székesfehérvár,47.1947,18.4081,Hungary,144319
Midland,32.0249,-102.1137,United States,144247
Huelva,37.2504,-6.9299,Spain,144174
Sarnia,42.9666,-82.4,Canada,144172
Goma,-1.6788,29.2218,Congo (Kinshasa),144124
Merced,37.3058,-120.4778,United States,144117
Tizi-Ouzou,36.8,4.0333,Algeria,144000
Kafr el Sheikh,31.109,30.936,Egypt,143970
Mesquite,32.7622,-96.5889,United States,143949
Ajdabiya,30.77,20.22,Libya,143833
Otaru,43.1887,140.9783,Japan,143792
Ipswich,52.0703,1.17,United Kingdom,143767
Logroño,42.4704,-2.43,Spain,143698
Stara Zagora,42.4231,25.6227,Bulgaria,143431
Béchar,31.6111,-2.23,Algeria,143382
Kenema,7.8804,-11.19,Sierra Leone,143137
Amiens,49.9004,2.3,France,143086
Calama,-22.45,-68.92,Chile,143084
Macaé,-22.38,-41.79,Brazil,143029
Cape Coast,5.1104,-1.25,Ghana,143015
Houma,29.5799,-90.7058,United States,142969
Play Ku,13.9833,108,Vietnam,142900
Pyatigorsk,44.08,43.09,Russia,142865
Charleston,38.3484,-81.6323,United States,142858
Cajamarca,-7.15,-78.53,Peru,142665
Pasadena,34.1598,-118.139,United States,142647
Arzamas,55.4,43.8,Russia,142597
Massawa,15.6101,39.45,Eritrea,142564
Durrës,41.3178,19.4482,Albania,142432
Nawabganj,24.5804,88.35,Bangladesh,142361
Pueblo,38.2701,-104.6131,United States,142351
Saïda,34.8404,0.14,Algeria,142213
Ciego de Ávila,21.84,-78.7619,Cuba,142027
Altay,47.8666,88.1166,China,142000
Jieshou,33.2504,115.35,China,141993
Chongju,39.6813,125.2163,"Korea, North",141769
Arnhem,51.988,5.923,Netherlands,141674
Phuket,7.8765,98.3815,Thailand,141618
Nongan,44.4304,125.1701,China,141482
Melilla,35.3,-2.95,Spain,141308
Tyler,32.3184,-95.3065,United States,141116
Paranaguá,-25.5279,-48.5345,Brazil,141013
Ghazni,33.5633,68.4178,Afghanistan,141000
Comodoro Rivadavia,-45.87,-67.5,Argentina,140850
As Salt,32.0392,35.7272,Jordan,140689
Labé,11.32,-12.3,Guinea,140575
Orange,33.8038,-117.8219,United States,140560
Almetyevsk,54.9004,52.3199,Russia,140437
Fullerton,33.8841,-117.9279,United States,140392
Miramar,25.9773,-80.3358,United States,140328
Lhokseumawe,5.1914,97.1415,Indonesia,140322
Orekhovo-Zuevo,55.82,38.98,Russia,140247
Santa Maria,34.9333,-120.4432,United States,140219
Athens,33.9508,-83.3689,United States,140169
Peterborough,52.5804,-0.25,United Kingdom,140141
Badajoz,38.8804,-6.97,Spain,140133
Dunhuang,40.1427,94.662,China,140094
Bordj Bou Arréridj,36.059,4.63,Algeria,140000
Columbia,38.9478,-92.3258,United States,139945
Bizerte,37.2904,9.855,Tunisia,139843
Sherbrooke,45.4,-71.9,Canada,139652
Piedras Negras,28.7076,-100.5317,Mexico,139619
Göttingen,51.5204,9.92,Germany,139419
Kumbakonam,10.9805,79.4,India,139264
Myitkyina,25.3596,97.3928,Burma,139100
Chinandega,12.6304,-87.13,Nicaragua,139023
Townsville,-19.25,146.77,Australia,138954
Yuma,32.5991,-114.5488,United States,138802
Tiruvannamalai,12.2604,79.1,India,138243
Zalantun,48,122.72,China,138032
Parnaíba,-2.91,-41.77,Brazil,138008
Pabna,24.0004,89.25,Bangladesh,137888
Umtata,-31.58,28.79,South Africa,137772
Bremerhaven,53.5504,8.58,Germany,137751
Tan An,10.5337,106.4167,Vietnam,137498
Olathe,38.8838,-94.8196,United States,137472
Castanhal,-1.2896,-47.93,Brazil,137406
Cerro de Pasco,-10.69,-76.27,Peru,137232
Iraklio,35.325,25.1305,Greece,137154
Thornton,39.9205,-104.9443,United States,136978
Harlingen,26.1917,-97.6977,United States,136968
Oulu,65,25.47,Finland,136752
Grand Junction,39.0878,-108.5673,United States,136688
Shizuishan,39.2333,106.769,China,136570
Baia Mare,47.6595,23.5791,Romania,136553
León,42.58,-5.57,Spain,136227
West Valley City,40.6889,-112.0115,United States,136170
Győr,47.7004,17.63,Hungary,136081
Carrollton,32.9886,-96.9,United States,135710
Serpukhov,54.9304,37.43,Russia,135584
Jequié,-13.85,-40.08,Brazil,135574
Cẩm Phả,21.0404,107.32,Vietnam,135477
Lira,2.2604,32.89,Uganda,135445
Roseville,38.7691,-121.3178,United States,135329
Pyay,18.8165,95.2114,Burma,135308
Orsha,54.5153,30.4215,Belarus,135206
May Pen,17.9666,-77.2333,Jamaica,135142
Warren,42.4934,-83.027,United States,135022
Souk Ahras,36.2904,7.95,Algeria,134947
Bloomington,40.4757,-88.9705,United States,134892
Zakho,37.1445,42.6872,Iraq,134863
Cartago,4.75,-75.91,Colombia,134827
Hampton,37.0551,-76.3629,United States,134669
Caxias,-4.833,-43.35,Brazil,134640
Ravenna,44.4204,12.22,Italy,134631
's-Hertogenbosch,51.6833,5.3167,Netherlands,134520
Nevinnomyssk,44.6201,41.95,Russia,134380
Surprise,33.6802,-112.4525,United States,134085
Las Cruces,32.3265,-106.7893,United States,133988
Touggourt,33.1,6.06,Algeria,133954
Greeley,40.415,-104.7696,United States,133750
Pervouralsk,56.91,59.955,Russia,133600
Yunxian,32.8082,110.8136,China,133558
Šiauliai,55.9386,23.325,Lithuania,133528
Birganj,27.0004,84.8666,Nepal,133238
Yakima,46.5923,-120.5496,United States,133233
Riohacha,11.5403,-72.91,Colombia,133186
Musoma,-1.4896,33.8,Tanzania,133156
Uppsala,59.8601,17.64,Sweden,133117
Awasa,7.06,38.477,Ethiopia,133097
Coral Springs,26.2701,-80.2592,United States,133037
Namibe,-15.19,12.16,Angola,132900
Kislovodsk,43.91,42.72,Russia,132771
Sterling Heights,42.5809,-83.0305,United States,132631
San Luis,16.2,-89.44,Guatemala,132470
Blitar,-8.0696,112.15,Indonesia,132416
Mauldin,34.7864,-82.2996,United States,132402
Dimitrovgrad,54.2504,49.56,Russia,132226
Pindamonhangaba,-22.92,-45.47,Brazil,132218
Shahrud,36.4229,54.9629,Iran,131889
Papeete,-17.5334,-149.5667,French Polynesia,131695
St. John's,47.585,-52.681,Canada,131469
Racine,42.7274,-87.8135,United States,131467
Opole,50.685,17.9313,Poland,131412
Tra Vinh,9.934,106.334,Vietnam,131360
Murom,55.5704,42.04,Russia,131287
Ciénaga,11.0104,-74.25,Colombia,131171
Lae,-6.733,146.99,Papua New Guinea,131052
Pilibhit,28.64,79.81,India,131008
Ferrara,44.8504,11.6099,Italy,130992
Novomoskovsk,54.09,38.22,Russia,130982
Buzău,45.1565,26.8065,Romania,130954
Stamford,41.1036,-73.5583,United States,130824
Pinsk,52.1279,26.0941,Belarus,130777
Shuangcheng,45.3503,126.28,China,130710
Abohar,30.1204,74.29,India,130603
Ninh Bình,20.2543,105.975,Vietnam,130517
Nikopol,47.5666,34.4062,Ukraine,130500
Florencia,1.6104,-75.62,Colombia,130337
Girardot,4.31,-74.81,Colombia,130289
Elizabeth,40.6657,-74.1912,United States,130215
Jaraguá do Sul,-26.48,-49.1,Brazil,130130
Sennar,13.55,33.6,Sudan,130122
Masaya,11.969,-86.095,Nicaragua,130113
Baydhabo,3.12,43.65,Somalia,129839
Tokat,40.306,36.563,Turkey,129702
Erzincan,39.7526,39.4928,Turkey,129407
Andong,36.5659,128.725,"Korea, South",129319
Tete,-16.17,33.58,Mozambique,129316
Copiapó,-27.36,-70.34,Chile,129280
Batticaloa,7.717,81.7,Sri Lanka,129222
Shar e Kord,32.321,50.854,Iran,129153
Kokshetau,53.3,69.42,Kazakhstan,128873
Idlib,35.9297,36.6317,Syria,128840
Xai-Xai,-25.04,33.64,Mozambique,128805
Kamina,-8.73,25.01,Congo (Kinshasa),128803
Larissa,39.6304,22.42,Greece,128758
Moroni,-11.7042,43.2402,Comoros,128698
Kamyshin,50.0804,45.4,Russia,128626
Karabük,41.2,32.6,Turkey,128564
Cambridge,52.2004,0.1166,United Kingdom,128488
Kent,47.3887,-122.2128,United States,128458
Besançon,47.23,6.03,France,128426
Greenville,35.5957,-77.3764,United States,128385
Sakakah,30,40.1333,Saudi Arabia,128332
Jima,7.68,36.83,Ethiopia,128306
Girga,26.3304,31.88,Egypt,128250
Manzanillo,20.3438,-77.1166,Cuba,128188
Surt,31.21,16.59,Libya,128123
Al Hasakah,36.4833,40.75,Syria,128100
Darnah,32.7648,22.6391,Libya,127974
Ekibastuz,51.73,75.3199,Kazakhstan,127868
Divo,5.839,-5.36,Côte D’Ivoire,127867
Simi Valley,34.2663,-118.749,United States,127864
San Nicolas,-33.33,-60.24,Argentina,127742
Bragança Paulista,-22.95,-46.55,Brazil,127676
Worcester,-33.64,19.4399,South Africa,127597
Tukuyu,-9.2496,33.64,Tanzania,127570
Port Blair,11.667,92.736,India,127562
Elbląg,54.19,19.4027,Poland,127558
Panevežys,55.74,24.37,Lithuania,127405
Wau,7.7,27.99,South Sudan,127384
Burlington,36.0762,-79.4687,United States,127374
Alipur Duar,26.4837,89.5667,India,127342
Lafia,8.4904,8.52,Nigeria,127236
Santa Clara,37.3646,-121.9679,United States,127134
Sancti Spíritus,21.9301,-79.4425,Cuba,127069
Pakokku,21.332,95.0866,Burma,126938
Hathras,27.6,78.05,India,126882
Neftekamsk,56.0835,54.2631,Russia,126805
Gafsa,34.4204,8.78,Tunisia,126803
Johnson City,36.3406,-82.3804,United States,126589
Sogamoso,5.72,-72.94,Colombia,126551
Edirne,41.6704,26.57,Turkey,126470
Songea,-10.68,35.65,Tanzania,126449
Tây Ninh,11.323,106.147,Vietnam,126370
Loja,-3.99,-79.21,Ecuador,126368
Macheng,31.18,115.03,China,126366
Carúpano,10.67,-63.23,Venezuela,126293
Tarragona,41.1204,1.25,Spain,126291
Itapetininga,-23.59,-48.04,Brazil,126243
Tengchong,25.0333,98.4666,China,126058
Boulder,40.0249,-105.2523,United States,126054
Bellingham,48.7543,-122.4687,United States,126015
Montego Bay,18.4667,-77.9167,Jamaica,126008
Magway,20.1445,94.9196,Burma,125973
Pangkalpinang,-2.08,106.15,Indonesia,125933
Malanje,-9.54,16.34,Angola,125856
Gashua,12.8705,11.04,Nigeria,125817
Leeuwarden,53.2504,5.7834,Netherlands,125778
Lubango,-14.91,13.49,Angola,125632
Fort Smith,35.3494,-94.3695,United States,125562
Sorong,-0.8554,131.285,Indonesia,125535
Kumbo,6.2204,10.68,Cameroon,125486
Ghardaia,32.49,3.67,Algeria,125480
Kelowna,49.9,-119.4833,Canada,125109
Lynchburg,37.4003,-79.1908,United States,125004
Marv Dasht,29.8014,52.8215,Iran,125000
Kenosha,42.5863,-87.8759,United States,124888
Semnan,35.5548,53.3743,Iran,124826
Nueva San Salvador,13.674,-89.29,El Salvador,124694
Zlín,49.2304,17.65,Czechia,124610
Fasa,28.9718,53.6715,Iran,124458
Lysychansk,48.9204,38.4274,Ukraine,124421
Drohobych,49.3444,23.4994,Ukraine,124269
Mỹ Tho,10.3504,106.35,Vietnam,124143
Laiwu,36.2004,117.66,China,124108
Alagoinhas,-12.14,-38.43,Brazil,124070
Rudny,52.9527,63.13,Kazakhstan,124000
South Lyon,42.4614,-83.6526,United States,123850
Higuey,18.616,-68.708,Dominican Republic,123787
Round Rock,30.5252,-97.6659,United States,123678
Potchefstroom,-26.6996,27.1,South Africa,123669
Siracusa,37.0704,15.29,Italy,123657
Guelma,36.466,7.428,Algeria,123590
Uruguaiana,-29.7696,-57.09,Brazil,123480
Indramayu,-6.3356,108.319,Indonesia,123263
Gagnoa,6.1504,-5.88,Côte D’Ivoire,123184
Porto Seguro,-16.4296,-39.08,Brazil,123173
Jiaohe,43.7163,127.346,China,123018
Ségou,13.44,-6.26,Mali,122952
Pati,-6.7415,111.0347,Indonesia,122785
San Fernando de Apure,7.9,-67.4699,Venezuela,122701
Brits,-25.6296,27.78,South Africa,122497
Maina,13.4692,144.7332,Guam,122411
Maastricht,50.853,5.677,Netherlands,122378
Berkeley,37.8723,-122.276,United States,122324
Tekirdağ,40.9909,27.51,Turkey,122287
Aalborg,57.0337,9.9166,Denmark,122219
Barbacena,-21.22,-43.77,Brazil,122211
Tauranga,-37.6964,176.1536,New Zealand,121500
Nancha,47.1364,129.2859,China,121367
Olmaliq,40.8504,69.595,Uzbekistan,121207
Xilinhot,43.9443,116.0443,China,120965
Billings,45.7889,-108.5503,United States,120800
Sassari,40.73,8.57,Italy,120729
Karaman,37.1815,33.215,Turkey,120399
Redding,40.5698,-122.365,United States,120270
Yuba City,39.1357,-121.6381,United States,120186
Manbij,36.5266,37.9563,Syria,120169
Duluth,46.7757,-92.1392,United States,120101
Larache,35.2004,-6.16,Morocco,120082
Huanghua,38.3704,117.33,China,120000
Pearland,29.5585,-95.3215,United States,119940
Puerto Plata,19.7902,-70.6902,Dominican Republic,119897
Maxixe,-23.866,35.3886,Mozambique,119868
Trois-Rivières,46.35,-72.5499,Canada,119693
Leominster,42.5209,-71.7717,United States,119400
Saginaw,43.4199,-83.9501,United States,119336
Jaú,-22.2896,-48.57,Brazil,119206
Tetovo,42.0092,20.9701,Macedonia,119132
Iowa City,41.6559,-91.5304,United States,119091
Udine,46.07,13.24,Italy,119009
Arvada,39.8321,-105.151,United States,118807
Pleven,43.4238,24.6134,Bulgaria,118675
Zielona Góra,51.9504,15.5,Poland,118433
Anuradhapura,8.35,80.3833,Sri Lanka,118302
Qomsheh,32.0115,51.8597,Iran,118301
Tongren,27.6804,109.13,China,118290
Berdyansk,46.7568,36.7868,Ukraine,118284
Bandundu,-3.31,17.38,Congo (Kinshasa),118211
Bama,11.5204,13.69,Nigeria,118121
Seaside,36.6224,-121.8191,United States,118110
Ourense,42.33,-7.87,Spain,118107
Kingsport,36.522,-82.5453,United States,118001
Setúbal,38.53,-8.9,Portugal,117974
Nakhon Pathom,13.818,100.064,Thailand,117927
Sokodé,8.9905,1.15,Togo,117811
Agadez,16.9959,7.9828,Niger,117770
Jalingo,8.9004,11.36,Nigeria,117757
Dunedin,-45.8854,170.491,New Zealand,117700
Achinsk,56.27,90.5,Russia,117634
Anaco,9.44,-64.46,Venezuela,117596
Punta Arenas,-53.165,-70.94,Chile,117430
San Martín,-33.07,-68.49,Argentina,117399
Independence,39.0871,-94.3503,United States,117306
Langsa,4.6736,97.9664,Indonesia,117256
Vyborg,60.7039,28.7549,Russia,117201
Calabozo,8.9304,-67.44,Venezuela,117132
Chiang Rai,19.9119,99.8265,Thailand,117127
Nkongsamba,4.9604,9.94,Cameroon,117063
Kindia,10.06,-12.87,Guinea,117062
Gao,16.2666,-0.05,Mali,116967
Port-Gentil,-0.72,8.78,Gabon,116836
Richardson,32.9717,-96.7092,United States,116783
Rochester,44.0151,-92.4778,United States,116713
Huanren,41.2563,125.346,China,116621
Taonan,45.3304,122.78,China,116611
Puno,-15.8329,-70.0333,Peru,116552
Jaén,37.7704,-3.8,Spain,116400
Nizhyn,51.0541,31.8903,Ukraine,116288
Yakeshi,49.2804,120.73,China,116284
Boké,10.94,-14.3,Guinea,116270
Gilroy,37.0047,-121.5843,United States,116235
Cherkessk,44.2904,42.06,Russia,116224
El Monte,34.074,-118.0291,United States,116109
Navajoa,27.0819,-109.4546,Mexico,116093
Rock Hill,34.9413,-81.025,United States,115963
Tahoua,14.9,5.2599,Niger,115956
Yelets,52.58,38.5,Russia,115919
Buizhou,37.3704,118.02,China,115893
Sri Jawewardenepura Kotte,6.9,79.95,Sri Lanka,115826
Inhambane,-23.858,35.3398,Mozambique,115776
Clearwater,27.9786,-82.7622,United States,115513
Monroe,32.5184,-92.0774,United States,115462
Dover,39.1603,-75.5203,United States,115352
Carlsbad,33.1246,-117.2837,United States,115330
Toliara,-23.3568,43.69,Madagascar,115319
Goulimine,28.98,-10.07,Morocco,115267
Pouso Alegre,-22.22,-45.94,Brazil,115201
Kulob,37.9212,69.7757,Tajikistan,115164
Nabeul,36.4603,10.73,Tunisia,115149
Tuguegarao,17.6131,121.7269,Philippines,115105
Norman,35.2335,-97.3471,United States,115065
Ciudad Valles,21.98,-99.02,Mexico,114964
Abilene,32.4543,-99.7384,United States,114964
Bloomington,39.1637,-86.5256,United States,114959
Delicias,28.2,-105.5,Mexico,114783
Botoșani,47.7484,26.6597,Romania,114783
Kamyanets-Podilskyy,48.6843,26.5809,Ukraine,114658
Texas City,29.4128,-94.9658,United States,114546
Giyon,8.5304,37.97,Ethiopia,114534
Shashemene,7.2004,38.59,Ethiopia,114350
Temecula,33.4928,-117.1314,United States,114327
Utica,43.0961,-75.226,United States,114318
Valparai,10.3204,76.97,India,114308
Kuito,-12.38,16.94,Angola,114286
Maribor,46.5405,15.65,Slovenia,114228
Saint Cloud,45.5339,-94.1719,United States,114225
Kingston,44.2337,-76.4833,Canada,114195
Siirt,37.944,41.933,Turkey,114034
Kankan,10.39,-9.31,Guinea,114009
Zhijiang,27.4409,109.678,China,113907
Saint George,37.0769,-113.577,United States,113906
West Jordan,40.6024,-112.0008,United States,113905
Kecskemét,46.9,19.7,Hungary,113895
Laghouat,33.81,2.88,Algeria,113872
Botucatu,-22.8796,-48.45,Brazil,113862
Costa Mesa,33.6667,-117.9135,United States,113825
Tobolsk,58.1998,68.2648,Russia,113800
Miami Gardens,25.9433,-80.2425,United States,113750
Curicó,-34.98,-71.24,Chile,113711
Bærum,59.9135,11.3472,Norway,113659
Cambridge,42.3758,-71.1184,United States,113630
Santa Cruz do Sul,-29.71,-52.44,Brazil,113625
Praia,14.9167,-23.5167,Cabo Verde,113364
Kipushi,-11.7596,27.25,Congo (Kinshasa),113347
Kitami,43.8504,143.9,Japan,113137
Exeter,50.7004,-3.53,United Kingdom,113118
Downey,33.9379,-118.1312,United States,113092
Coeur d'Alene,47.7039,-116.7933,United States,112935
Malé,4.1667,73.4999,Maldives,112927
Tokmak,42.8299,75.2846,Kyrgyzstan,112860
Westminster,39.8837,-105.0627,United States,112812
Nefteyugansk,61.0777,72.7027,Russia,112632
Shaowu,27.3004,117.5,China,112585
Mojokerto,-7.4696,112.43,Indonesia,112557
Satu Mare,47.792,22.885,Romania,112490
Elgin,42.0385,-88.3229,United States,112456
Guanajuato,21.0204,-101.28,Mexico,112200
El Centro,32.7873,-115.5579,United States,112145
Mazyr,52.046,29.2722,Belarus,112137
Iguala,18.37,-99.54,Mexico,112106
Waterloo,42.492,-92.3522,United States,112060
Juba,4.83,31.58,South Sudan,111975
Nakhon Sawan,15.7,100.07,Thailand,111915
Iringa,-7.7696,35.69,Tanzania,111820
Zwolle,52.524,6.097,Netherlands,111805
Kandy,7.28,80.67,Sri Lanka,111701
Conselheiro Lafaiete,-20.67,-43.79,Brazil,111596
Daugavpils,55.88,26.51,Latvia,111564
Kuqa,41.7277,82.9364,China,111499
Magelang,-7.4696,110.18,Indonesia,111461
Santa Rosa,-36.62,-64.3,Argentina,111424
Lowell,42.6389,-71.3217,United States,111346
Jawhar,2.767,45.5166,Somalia,111308
Gresham,45.5023,-122.4414,United States,111053
Algeciras,36.1267,-5.4665,Spain,111027
Nsukka,6.867,7.3834,Nigeria,111017
Nguru,12.8804,10.45,Nigeria,111014
North Charleston,32.9086,-80.0705,United States,110861
Balkanabat,39.5124,54.3649,Turkmenistan,110827
Manzanillo,19.0496,-104.3231,Mexico,110735
Pemba,-12.983,40.5323,Mozambique,110643
Volos,39.37,22.95,Greece,110632
Inglewood,33.9566,-118.3444,United States,110598
Noyabrsk,63.1665,75.6165,Russia,110572
Yaynangyoung,20.4615,94.881,Burma,110553
Manzini,-26.495,31.388,Swaziland,110537
Pompano Beach,26.2428,-80.1312,United States,110473
Centennial,39.5926,-104.8674,United States,110250
West Palm Beach,26.7467,-80.1314,United States,110222
Mzuzu,-11.46,34.02,Malawi,110201
Bouïra,36.3805,3.9,Algeria,110144
Garanhuns,-8.89,-36.5,Brazil,110085
Everett,47.9524,-122.167,United States,110079
Santa Fe,35.6619,-105.9819,United States,110078
Linqing,36.8504,115.68,China,110046
Richmond,37.9477,-122.339,United States,110040
David,8.4333,-82.4333,Panama,110037
Milagro,-2.1796,-79.6,Ecuador,109970
Bataysk,47.1368,39.7449,Russia,109962
Hailun,47.4504,126.93,China,109881
Lichinga,-13.3,35.24,Mozambique,109839
Kandi,11.1304,2.94,Benin,109701
Dali,34.7953,109.9378,China,109696
Clovis,36.8278,-119.6841,United States,109691
Tieli,46.9504,128.05,China,109636
Ipiales,0.8304,-77.65,Colombia,109618
Catanduva,-21.14,-48.98,Brazil,109612
Szombathely,47.2253,16.6287,Hungary,109518
Pottstown,40.2508,-75.6445,United States,109437
Heihe,50.25,127.446,China,109427
Siem Reap,13.3666,103.85,Cambodia,109398
Szolnok,47.1864,20.1794,Hungary,109261
Sergiyev Posad,56.33,38.17,Russia,109252
Tumbes,-3.57,-80.46,Peru,109223
San Rafael,-34.6,-68.3333,Argentina,109163
Matagalpa,12.9171,-85.9167,Nicaragua,109089
Tuxpam,20.9604,-97.41,Mexico,109049
Leninsk Kuznetsky,54.66,86.17,Russia,109023
Soubré,5.7904,-6.61,Côte D’Ivoire,108933
Jacksonville,34.7323,-77.3962,United States,108872
Karamay,45.5899,84.8599,China,108769
Kaposvár,46.367,17.8,Hungary,108528
Mopti,14.49,-4.18,Mali,108456
Trincomalee,8.569,81.233,Sri Lanka,108420
Broken Arrow,36.0365,-95.7808,United States,108303
Burlington,44.4877,-73.2314,United States,108277
Nehe,48.49,124.88,China,108253
Kyzyl,51.7067,94.3831,Russia,108240
Mascara,35.4004,0.14,Algeria,108230
Oktyabrskiy,54.46,53.46,Russia,108200
Birnin Kebbi,12.4504,4.1999,Nigeria,108164
En Nuhud,12.6904,28.42,Sudan,108008
Estelí,13.09,-86.36,Nicaragua,107839
Barletta,41.32,16.27,Italy,107830
Trento,46.0804,11.12,Italy,107808
Escuintla,15.33,-92.63,Mexico,107638
Escuintla,14.3004,-90.78,Guatemala,107638
West Covina,34.0555,-117.9113,United States,107598
Kogon,39.7211,64.5458,Uzbekistan,107566
Rimnicu Vilcea,45.11,24.383,Romania,107558
Koszalin,54.2,16.1833,Poland,107450
Obninsk,55.0804,36.62,Russia,107392
Shinyanga,-3.6596,33.42,Tanzania,107362
Luxembourg,49.6117,6.13,Luxembourg,107260
Turlock,37.5053,-120.8588,United States,107208
Västerås,59.63,16.54,Sweden,107194
Chapayevsk,52.9743,49.7243,Russia,107164
Louangphrabang,19.8845,102.1416,Laos,107142
Ilebo,-4.3196,20.61,Congo (Kinshasa),107093
Golmud,36.4166,94.8833,China,107092
Apucarana,-23.55,-51.47,Brazil,107085
Daly City,37.6863,-122.4684,United States,107074
Eau Claire,44.8203,-91.4951,United States,107068
Pardubice,50.0404,15.76,Czechia,107064
Ratchaburi,13.5419,99.8215,Thailand,106996
Elista,46.3287,44.2087,Russia,106971
Taungoo,18.9483,96.4179,Burma,106945
Hillsboro,45.5271,-122.9358,United States,106894
Kandalaksha,67.1643,32.4144,Russia,106798
Sandy Springs,33.9366,-84.3703,United States,106739
Douliou,23.7075,120.5439,Taiwan,106653
Coimbra,40.2004,-8.4167,Portugal,106582
Drobeta-Turnu Severin,44.6459,22.6659,Romania,106578
Longjiang,47.3404,123.18,China,106384
Namur,50.4704,4.87,Belgium,106284
Sioux City,42.4959,-96.3901,United States,106279
Chico,39.7574,-121.815,United States,106268
Novotroitsk,51.2,58.33,Russia,106186
Raba,-8.45,118.7666,Indonesia,106101
Bagé,-31.32,-54.1,Brazil,106098
Norwalk,33.9069,-118.0829,United States,106084
Salisbury,38.3755,-75.5867,United States,106034
Lewisville,33.0453,-96.9823,United States,106021
Derbent,42.0578,48.2774,Russia,105965
Suceava,47.6377,26.2593,Romania,105796
Annecy,45.9,6.1167,France,105749
Salto,-31.3903,-57.9687,Uruguay,105690
Azare,11.6804,10.19,Nigeria,105687
Lahad Datu,5.0464,118.336,Malaysia,105622
Sadah,16.9398,43.8498,Yemen,105542
Assab,13.01,42.73,Eritrea,105496
Kon Tum,14.3838,107.9833,Vietnam,105489
Fresnillo,23.1704,-102.86,Mexico,105488
Lugano,46.0004,8.9667,Switzerland,105388
Queenstown,-31.8996,26.88,South Africa,105309
Hoa Binh,20.8137,105.3383,Vietnam,105260
Granada‎,11.9337,-85.95,Nicaragua,105219
Kongolo,-5.3795,26.98,Congo (Kinshasa),105202
Jizan,16.9066,42.5566,Saudi Arabia,105198
Davie,26.079,-80.287,United States,105149
Focșani,45.6966,27.1865,Romania,105112
Linhares,-19.39,-40.05,Brazil,105075
Cottbus,51.7704,14.33,Germany,105067
Koutiala,12.3904,-5.47,Mali,104927
League City,29.4874,-95.1087,United States,104903
Prijedor,44.9804,16.7,Bosnia And Herzegovina,104858
Burbank,34.1879,-118.3234,United States,104834
San Mateo,37.5522,-122.3122,United States,104748
Jena,50.9304,11.58,Germany,104712
Gera,50.8704,12.07,Germany,104659
Torbat-e Jam,35.2233,60.6129,Iran,104578
Nong Khai,17.8733,102.7479,Thailand,104505
Brindisi,40.6403,17.93,Italy,104437
Mmabatho,-25.83,25.61,South Africa,104428
Zhezqazghan,47.78,67.77,Kazakhstan,104357
Tandil,-37.32,-59.15,Argentina,104325
San Antonio,-33.5995,-71.61,Chile,104292
Maumere,-8.6189,122.2123,Indonesia,104285
Albury,-36.06,146.92,Australia,104258
Al Qamishli,37.03,41.23,Syria,104107
Adigrat,14.2804,39.47,Ethiopia,104021
Abengourou,6.7304,-3.49,Côte D’Ivoire,104020
Kiselevsk,54,86.64,Russia,104000
Kroonstad,-27.66,27.21,South Africa,103992
EdDamer,17.59,33.96,Sudan,103941
Loubomo,-4.1796,12.67,Congo (Brazzaville),103894
El Cajon,32.8017,-116.9604,United States,103894
Kilinochchi,9.4004,80.3999,Sri Lanka,103717
Ahar,38.4829,47.0629,Iran,103639
Biak,-1.1615,136.0485,Indonesia,103610
Gardiz,33.6001,69.2146,Afghanistan,103601
Rialto,34.1128,-117.3885,United States,103562
Konotop,51.2424,33.209,Ukraine,103547
Matruh,31.3504,27.23,Egypt,103470
Perabumulih,-3.4432,104.2315,Indonesia,103470
Guaymas,27.93,-110.89,Mexico,103449
Hidalgo del Parral,26.9334,-105.6666,Mexico,103378
Bend,44.0562,-121.3087,United States,103349
Vĩnh Long,10.256,105.964,Vietnam,103314
Velikiye Luki,56.32,30.52,Russia,103149
Palma Soriano,20.2172,-75.9988,Cuba,102826
Pedro Juan Caballero,-22.5446,-55.76,Paraguay,102787
Pakxe,15.1221,105.8183,Laos,102775
Roxas,11.5853,122.7511,Philippines,102688
Piatra-Neamt,46.94,26.383,Romania,102688
Grudziądz,53.4804,18.75,Poland,102443
Lower Hutt,-41.2037,174.9123,New Zealand,102400
Houma,35.62,111.21,China,102400
Ukhta,63.56,53.69,Russia,102187
Liberec,50.8,15.08,Czechia,102175
Charlottesville,38.0375,-78.4855,United States,102016
Bethal,-26.4696,29.45,South Africa,101919
La Crosse,43.8241,-91.2268,United States,101886
Temple,31.1076,-97.3894,United States,101876
Bontang,0.1333,117.5,Indonesia,101691
Teluk Intan,4.0119,101.0314,Malaysia,101659
Ibri,23.2254,56.517,Oman,101640
Dera Ismail Khan,31.829,70.8986,Pakistan,101616
Vista,33.1895,-117.2387,United States,101568
Kansk,56.19,95.71,Russia,101502
Renton,47.4758,-122.1905,United States,101379
Sarapul,56.4791,53.7987,Russia,101344
Maladzyechna,54.3188,26.8653,Belarus,101300
Olomouc,49.63,17.25,Czechia,101268
Barretos,-20.55,-48.58,Brazil,101220
Teófilo Otoni,-17.87,-41.5,Brazil,101170
Kilchu,40.9604,129.3204,"Korea, North",101165
Duitama,5.8305,-73.02,Colombia,101156
Vanadzor,40.8128,44.4883,Armenia,101098
Tartu,58.3839,26.7099,Estonia,101092
Novara,45.45,8.62,Italy,100910
Sparks,39.5729,-119.7157,United States,100888
Holland,42.7677,-86.0984,United States,100885
Oum el Bouaghi,35.85,7.15,Algeria,100821
Solikamsk,59.67,56.75,Russia,100812
Vacaville,38.3592,-121.9686,United States,100801
Logan,41.7402,-111.8419,United States,100774
Allen,33.1088,-96.6735,United States,100685
Glazov,58.1232,52.6288,Russia,100676
Ancona,43.6004,13.4999,Italy,100507
Bukoba,-1.3196,31.8,Tanzania,100504
Kpalimé,6.9004,0.63,Togo,100479
Sakata,38.92,139.8501,Japan,100446
Magangué,9.23,-74.74,Colombia,100313
Ust-Ulimsk,57.99,102.6333,Russia,100271
Sabha,27.0333,14.4333,Libya,100249
Lida,53.8885,25.2846,Belarus,100216
Longview,32.5192,-94.7622,United States,100196
Arlit,18.82,7.33,Niger,100000
Subotica,46.07,19.68,Serbia,100000
Chamdo,31.1667,97.2333,China,100000
Isna,25.2904,32.5499,Egypt,100000
Meridian,43.6113,-116.3972,United States,99926
San Angelo,31.4426,-100.4501,United States,99890
Tsuruoka,38.7004,139.8302,Japan,99820
Chanthaburi,12.6133,102.0979,Thailand,99819
Tumen,42.97,129.8201,China,99721
Urgut,39.4007,67.2607,Uzbekistan,99675
Wichita Falls,33.9072,-98.5293,United States,99617
Zelenodolsk,55.8406,48.655,Russia,99600
Galle,6.03,80.24,Sri Lanka,99478
Novoshakhtinsk,47.77,39.92,Russia,99478
Choluteca,13.3007,-87.1908,Honduras,99429
Longmont,40.1691,-105.0996,United States,99398
Thunder Bay,48.4462,-89.275,Canada,99334
Thika,-1.0396,37.09,Kenya,99322
Bam,29.1077,58.362,Iran,99268
Fengzhen,40.4547,113.1443,China,99174
Kwekwe,-18.9296,29.8,Zimbabwe,99149
Tuapse,44.1148,39.0644,Russia,99145
Talara,-4.58,-81.28,Peru,99074
Giresun,40.913,38.39,Turkey,98864
Kericho,-0.3596,35.28,Kenya,98852
České Budějovice,48.98,14.46,Czechia,98851
Lahti,60.9939,25.6649,Finland,98826
Kontagora,10.4004,5.4699,Nigeria,98754
Passos,-20.71,-46.61,Brazil,98752
Manteca,37.7938,-121.227,United States,98736
Thimphu,27.473,89.639,Bhutan,98676
Votkinsk,57.0304,53.99,Russia,98633
Örebro,59.2803,15.22,Sweden,98573
Serov,59.615,60.585,Russia,98438
Apatzingán,19.08,-102.35,Mexico,98422
Boca Raton,26.3749,-80.1077,United States,98150
Jyväskylä,62.2603,25.75,Finland,98136
Balashov,51.5535,43.1631,Russia,98107
Iseyin,7.97,3.59,Nigeria,98071
Flensburg,54.7837,9.4333,Germany,97930
Zheleznogorsk,52.3548,35.4044,Russia,97900
Spokane Valley,47.6625,-117.2346,United States,97847
Atlixco,18.9,-98.45,Mexico,97842
Orem,40.2983,-111.6993,United States,97839
Ubá,-21.1196,-42.95,Brazil,97828
Ozamis,8.1462,123.8444,Philippines,97806
Ourinhos,-22.97,-49.87,Brazil,97799
Middletown,39.5032,-84.3659,United States,97762
Slavonski Brod,45.1603,18.0156,Croatia,97718
Mangochi,-14.4596,35.27,Malawi,97711
L'Ariana,36.8667,10.2,Tunisia,97687
Compton,33.893,-118.2275,United States,97612
Idaho Falls,43.4868,-112.0363,United States,97548
Trindade,-16.65,-49.5,Brazil,97521
Beaverton,45.4779,-122.8168,United States,97514
Arapongas,-23.41,-51.43,Brazil,97512
Bismarck,46.814,-100.7695,United States,97457
Bafra,41.5682,35.9069,Turkey,97452
Az Zahran,26.2914,50.1583,Saudi Arabia,97446
Turkistan,43.3016,68.2549,Kazakhstan,97360
Lawrence,38.9597,-95.2641,United States,97341
San Carlos del Zulia,9.0104,-71.92,Venezuela,97288
Târgu Jiu,45.045,23.274,Romania,97179
Prescott Valley,34.5982,-112.3178,United States,97066
Shangzhi,45.2204,127.97,China,96980
Guasave,25.5705,-108.47,Mexico,96860
Shostka,51.8734,33.4797,Ukraine,96825
Yasuj,30.659,51.594,Iran,96786
Bunia,1.5604,30.24,Congo (Kinshasa),96764
Linköping,58.41,15.6299,Sweden,96732
Federal Way,47.309,-122.3359,United States,96690
Schwerin,53.6333,11.4167,Germany,96641
Bolu,40.7363,31.6061,Turkey,96629
Mtwara,-10.2696,40.19,Tanzania,96602
Araguari,-18.64,-48.2,Brazil,96565
Yên Bái,21.705,104.875,Vietnam,96540
Corumbá,-19.016,-57.65,Brazil,96520
Half Way Tree,18.0333,-76.8,Jamaica,96494
Sliven,42.6794,26.33,Bulgaria,96368
Kelo,9.3171,15.8,Chad,96224
San Marcos,33.1349,-117.1744,United States,96198
Rio Rancho,35.2872,-106.6981,United States,96159
Erechim,-27.63,-52.27,Brazil,96087
Yola,9.21,12.48,Nigeria,96006
Tracy,37.726,-121.444,United States,95982
Aurangabad,24.7704,84.38,India,95929
Sungaipenuh,-2.0631,101.3964,Indonesia,95913
Bolzano,46.5004,11.36,Italy,95895
Mekele,13.5,39.47,Ethiopia,95856
Brockton,42.0821,-71.0242,United States,95672
Kuznetsk,53.1204,46.6,Russia,95574
Guliston,40.4957,68.7907,Uzbekistan,95520
South Gate,33.9447,-118.1926,United States,95430
San Carlos de Bariloche,-41.15,-71.3,Argentina,95394
Magadan,59.575,150.81,Russia,95282
Boli,45.7564,130.5759,China,95260
Catanzaro,38.9004,16.6,Italy,95251
Hradec Králové,50.206,15.812,Czechia,95195
Juazeiro,-9.42,-40.5,Brazil,95132
Osijek,45.5504,18.68,Croatia,95077
Al Aqabah,29.527,35.0777,Jordan,95048
Biu,10.6204,12.19,Nigeria,95005
Latacunga,-0.9296,-78.61,Ecuador,94972
Hesperia,34.3974,-117.3144,United States,94859
Dobrich,43.5851,27.84,Bulgaria,94831
Naxcivan,39.2092,45.4122,Azerbaijan,94788
Roswell,34.0391,-84.3513,United States,94786
Nowra,-34.8828,150.6,Australia,94781
Mandeville,30.375,-90.0906,United States,94760
Vineland,39.4653,-74.9981,United States,94734
Prešov,48.9997,21.2394,Slovakia,94718
Portsmouth,36.8468,-76.354,United States,94572
Dearborn,42.3127,-83.2129,United States,94491
Kırşehir,39.142,34.171,Turkey,94336
Ponta Porã,-22.53,-55.73,Brazil,94331
Sunrise,26.1547,-80.2997,United States,94323
Bento Gonçalves,-29.1695,-51.52,Brazil,94271
Novy Urengoy,66.0833,76.6332,Russia,94212
Quincy,42.2516,-71.0183,United States,94166
Al Fujayrah,25.1234,56.3375,United Arab Emirates,94163
Lagos de Moreno,21.3704,-101.93,Mexico,94127
Yishui,35.7904,118.62,China,94115
Usti Nad Labem,50.663,14.081,Czechia,94105
Livonia,42.3972,-83.3733,United States,94105
Lynn,42.4779,-70.9663,United States,94063
Malindi,-3.21,40.1,Kenya,94016
Plantation,26.126,-80.2617,United States,93909
Slidell,30.2882,-89.7826,United States,93882
Samandagi,36.1171,35.9333,Turkey,93638
Manzhouli,49.6,117.43,China,93620
Tatuí,-23.35,-47.86,Brazil,93580
Michurinsk,52.9,40.5,Russia,93499
Trelew,-43.25,-65.33,Argentina,93442
Nazran,43.233,44.783,Russia,93357
Daan,45.5,124.3,China,93297
Polatlı,39.5842,32.1472,Turkey,93262
Sheberghan,36.658,65.7383,Afghanistan,93241
Bath,51.3837,-2.35,United Kingdom,93238
Bafang,5.1704,10.18,Cameroon,93145
Darwin,-12.4254,130.85,Australia,93080
Nouméa,-22.2625,166.4443,New Caledonia,93060
Ho,6.6004,0.47,Ghana,93044
Kineshma,57.47,42.13,Russia,92983
Coronel,-37.03,-73.16,Chile,92940
Wukari,7.8704,9.78,Nigeria,92933
Rosenheim,47.8503,12.1333,Germany,92809
Toowoomba,-27.5645,151.9555,Australia,92800
Quibdó,5.6904,-76.66,Colombia,92780
Carson,33.8374,-118.2559,United States,92735
Terre Haute,39.4654,-87.3763,United States,92722
Sampit,-2.5329,112.95,Indonesia,92710
Foumban,5.7304,10.9,Cameroon,92673
Patos,-7.0196,-37.29,Brazil,92575
Blacksburg,37.23,-80.428,United States,92573
Portsmouth,43.058,-70.7826,United States,92513
Tulcea,45.1993,28.7967,Romania,92475
Fuan,27.0704,119.62,China,92470
Maizuru,35.4504,135.3333,Japan,92465
Villa María,-32.41,-63.26,Argentina,92453
Santiago de Compostela,42.8829,-8.5411,Spain,92430
Itaituba,-4.2586,-55.925,Brazil,92308
Miami Beach,25.8171,-80.1396,United States,92307
Santa Monica,34.0232,-118.4813,United States,92306
Dhangarhi,28.695,80.593,Nepal,92294
Tubarão,-28.48,-49.02,Brazil,92275
Dover,43.1887,-70.8845,United States,92234
Calais,50.9504,1.8333,France,92201
Carmel,39.9658,-86.1461,United States,92198
Ciudad Guzman,19.7104,-103.46,Mexico,92161
Ereğli,37.5063,34.0517,Turkey,92117
Kohima,25.667,94.1166,India,92113
Hanford,36.326,-119.654,United States,92066
Danjiangkou,32.52,111.5,China,92008
Lafayette,39.9949,-105.0997,United States,91985
Edmond,35.6689,-97.4159,United States,91950
Bugulma,54.5543,52.7943,Russia,91900
Kuopio,62.8943,27.6949,Finland,91900
Kilosa,-6.8396,36.99,Tanzania,91889
Fishers,39.9589,-85.967,United States,91832
Cabinda,-5.5596,12.19,Angola,91791
Arezzo,43.4617,11.875,Italy,91589
Westminster,33.7523,-117.9938,United States,91564
Grahamstown,-33.2996,26.52,South Africa,91548
Novoaltaysk,53.3993,83.9588,Russia,91386
Lawton,34.6171,-98.4204,United States,91383
Tecoman,18.9204,-103.88,Mexico,91321
Florence,34.1785,-79.7857,United States,91311
Helsingborg,56.0505,12.7,Sweden,91304
Mons,50.446,3.939,Belgium,91277
Kendu Bay,-0.3596,34.64,Kenya,91248
Muriaé,-21.13,-42.39,Brazil,91173
Pingdu,36.7904,119.94,China,91077
Niğde,37.976,34.694,Turkey,91039
Livermore,37.6861,-121.7608,United States,91030
Lüleburgaz,41.4067,27.3552,Turkey,90899
Chauk,20.9085,94.823,Burma,90870
Cuauhtémoc,28.4257,-106.8696,Mexico,90835
Drammen,59.7572,10.1907,Norway,90722
Moncton,46.0833,-64.7667,Canada,90635
Klagenfurt,46.6203,14.31,Austria,90610
Lees Summit,38.9172,-94.3816,United States,90597
Menifee,33.6909,-117.1849,United States,90595
San Leandro,37.7071,-122.1601,United States,90553
Albany,31.5776,-84.1762,United States,90515
Phetchaburi,13.1133,99.9412,Thailand,90497
Gatchina,59.5707,30.1333,Russia,90486
Bowling Green,36.9721,-86.4367,United States,90448
Itanhaem,-24.18,-46.8,Brazil,90385
Edinburg,26.319,-98.1607,United States,90280
Kirovo-Chepetsk,58.5544,50.0444,Russia,90252
Suffolk,36.6953,-76.6398,United States,90237
Missoula,46.8685,-114.0094,United States,90218
Reconquista,-29.1395,-59.65,Argentina,90184
Mbabane,-26.3167,31.1333,Swaziland,90138
Barahona,18.2004,-71.1,Dominican Republic,90128
Buea,4.155,9.231,Cameroon,90088
Limerick,52.6647,-8.6231,Ireland,90054
Francistown,-21.17,27.5,Botswana,89979
Chino,33.9836,-117.6653,United States,89797
Yegoryevsk,55.3848,39.0294,Russia,89795
Jönköping,57.7713,14.165,Sweden,89780
Santana do Livramento,-30.88,-55.53,Brazil,89694
Auburn,32.6084,-85.4897,United States,89577
Vlorë,40.4774,19.4982,Albania,89546
Chester,53.2,-2.92,United Kingdom,89531
Fujin,47.2704,132.02,China,89442
Fall River,41.7136,-71.1015,United States,89420
Hosaina,7.5504,37.85,Ethiopia,89300
Tambacounda,13.7804,-13.68,Senegal,89212
Sumbawanga,-7.9596,31.62,Tanzania,89161
Valle de la Pascua,9.21,-66.02,Venezuela,89080
Norwalk,41.1144,-73.4215,United States,89005
Decatur,39.8556,-88.9337,United States,88997
Newton,42.3316,-71.2084,United States,88994
Rapid City,44.0716,-103.2205,United States,88979
Shwebo,22.5783,95.6929,Burma,88914
Zárate,-34.0896,-59.04,Argentina,88781
Wangqing,43.3248,129.7343,China,88732
Rafaela,-31.25,-61.5,Argentina,88713
Muncie,40.1989,-85.395,United States,88688
Norrköping,58.5954,16.1787,Sweden,88639
Kirkland,47.6997,-122.2041,United States,88630
Montero,-17.3496,-63.26,Bolivia,88616
Chosica,-11.93,-76.71,Peru,88606
Chaman,30.925,66.4463,Pakistan,88568
Brovary,50.4943,30.7809,Ukraine,88506
Sugar Land,29.5965,-95.6293,United States,88485
Târgoviște,44.938,25.459,Romania,88435
Nova Lima,-19.98,-43.85,Brazil,88399
Taldyqorghan,45,78.4,Kazakhstan,88380
Zhob,31.349,69.4386,Pakistan,88356
Qal at Bishah,20.0087,42.5987,Saudi Arabia,88291
State College,40.7909,-77.8568,United States,88285
Brusque,-27.13,-48.93,Brazil,88284
São Tomé,0.3334,6.7333,Sao Tome And Principe,88219
Coronel Oviedo,-25.45,-56.44,Paraguay,88101
Citrus Heights,38.6948,-121.288,United States,87931
Yozgat,39.818,34.815,Turkey,87881
Madinat ath Thawrah,35.8367,38.5481,Syria,87880
Ebolowa,2.9,11.15,Cameroon,87875
Saint John,45.267,-66.0767,Canada,87857
Ağrı,39.7198,43.0513,Turkey,87854
Hawthorne,33.9147,-118.3476,United States,87854
Surigao,9.7843,125.4888,Philippines,87832
Jackson,42.2431,-84.4038,United States,87819
Yeysk,46.6988,38.2634,Russia,87814
Çanakkale,40.1459,26.4064,Turkey,87791
Parepare,-4.0167,119.6333,Indonesia,87776
San Juan De Los Morros,9.901,-67.354,Venezuela,87739
Waukegan,42.3697,-87.8716,United States,87729
Buzuluk,52.7821,52.2618,Russia,87714
Makeni,8.8804,-12.05,Sierra Leone,87679
Uman,48.7543,30.2109,Ukraine,87658
Pergamino,-33.8996,-60.57,Argentina,87652
Žilina,49.2198,18.7494,Slovakia,87625
Gitarama,-2.0696,29.76,Rwanda,87613
O'Fallon,38.7851,-90.7176,United States,87597
Koidu,8.4405,-10.85,Sierra Leone,87539
Assis,-22.6596,-50.42,Brazil,87471
Changting,25.867,116.3167,China,87458
Koudougou,12.2505,-2.37,Burkina Faso,87347
Shumen,43.27,26.9294,Bulgaria,87283
Mishan,45.5504,131.88,China,87257
Nenjiang,49.18,125.23,China,87236
Ed Dueim,13.9904,32.3,Sudan,87068
Napa,38.2977,-122.3011,United States,87032
Lokossa,6.615,1.715,Benin,86971
Huaraz,-9.53,-77.53,Peru,86934
Dalton,34.7689,-84.9711,United States,86841
Whittier,33.9678,-118.0188,United States,86838
Nouadhibou,20.9,-17.056,Mauritania,86738
Tumaco,1.81,-78.81,Colombia,86713
Ruhengeri,-1.4996,29.63,Rwanda,86685
Redwood City,37.5026,-122.2252,United States,86685
Mount Pleasant,32.8533,-79.8269,United States,86668
Clifton,40.8631,-74.1575,United States,86607
Bitola,41.0391,21.3395,Macedonia,86528
Anderson,40.0874,-85.692,United States,86481
Olavarría,-36.9,-60.33,Argentina,86320
Ioanina,39.6679,20.8509,Greece,86304
Joplin,37.0766,-94.5016,United States,86298
Panshi,42.9426,126.0561,China,86216
Newport Beach,33.6151,-117.8669,United States,86160
Lorca,37.6886,-1.6985,Spain,86119
Shchekino,54.0143,37.5143,Russia,86088
Agua Prieta,31.3223,-109.563,Mexico,86083
Potiskum,11.7104,11.08,Nigeria,86002
Huehuetenango,15.3204,-91.47,Guatemala,85992
Chipata,-13.6296,32.64,Zambia,85963
Poitier,46.5833,0.3333,France,85960
Keffi,8.849,7.8736,Nigeria,85911
Usolye Sibirskoye,52.765,103.645,Russia,85900
Bloomington,44.8306,-93.3151,United States,85866
Helong,42.5348,129.0044,China,85756
Behbehan,30.5818,50.2615,Iran,85707
Río Gallegos,-51.6333,-69.2166,Argentina,85700
Chumphon,10.5127,99.1872,Thailand,85686
Sokcho,38.2087,128.5912,"Korea, South",85430
Versailles,48.8005,2.1333,France,85416
Alhambra,34.084,-118.1355,United States,85396
Paulo Afonso,-9.3307,-38.2657,Brazil,85350
Ituiutaba,-18.97,-49.46,Brazil,85345
Cáceres,-16.05,-57.51,Brazil,85274
Liepaga,56.51,21.01,Latvia,85132
Ballarat,-37.5596,143.84,Australia,85109
Louga,15.6104,-16.25,Senegal,85075
Junín,-34.5846,-60.9589,Argentina,85007
Puerto Limon,10,-83.0333,Costa Rica,85001
Lorient,47.7504,-3.3666,France,84952
Hoover,33.3763,-86.8058,United States,84920
Nanaimo,49.146,-123.9343,Canada,84905
Savannakhet,16.5376,104.773,Laos,84898
Largo,27.9088,-82.7713,United States,84754
Sumenep,-7.0049,113.8496,Indonesia,84656
Guider,9.9304,13.94,Cameroon,84647
Mission,26.204,-98.3251,United States,84424
Conroe,30.322,-95.4807,United States,84378
Johns Creek,34.0333,-84.2027,United States,84350
Linjiang,41.8363,126.936,China,84315
Lake Forest,33.6607,-117.6712,United States,84293
Trinidad,-14.8334,-64.9,Bolivia,84259
Yurga,55.7258,84.8854,Russia,84220
Bryan,30.6657,-96.3672,United States,84021
Porto Santana,-0.0396,-51.18,Brazil,83927
Port Huron,42.9822,-82.4387,United States,83841
Troy,42.5818,-83.1457,United States,83813
Mbarara,-0.5996,30.65,Uganda,83700
Anzhero Sudzhensk,56.08,86.04,Russia,83692
Bethlehem,-28.2196,28.3,South Africa,83654
Londonderry,55.0004,-7.3333,United Kingdom,83652
Madera,36.964,-120.0803,United States,83636
Peterborough,44.3,-78.3333,Canada,83627
Gisenyi,-1.6847,29.2629,Rwanda,83623
Ocaña,8.2404,-73.35,Colombia,83511
Ouidah,6.3604,2.09,Benin,83503
Reșița,45.297,21.8865,Romania,83324
Codó,-4.4796,-43.88,Brazil,83288
Springfield,39.9304,-83.7961,United States,83286
Kampong Cham,12.0004,105.45,Cambodia,83233
Izmayil,45.3503,28.8374,Ukraine,83194
Buena Park,33.8572,-118.0046,United States,83015
Pleasanton,37.6664,-121.8805,United States,83007
Tulcán,0.822,-77.732,Ecuador,83000
Antsiranana,-12.2765,49.3115,Madagascar,82937
Amasya,40.6537,35.833,Turkey,82896
Wiener Neustadt,47.816,16.25,Austria,82762
Araxá,-19.5796,-46.95,Brazil,82595
Cicero,41.8445,-87.7593,United States,82552
Muş,38.749,41.4969,Turkey,82536
Nan,18.7868,100.7715,Thailand,82483
Pernik,42.61,23.0227,Bulgaria,82467
Bagamoyo,-6.4396,38.89,Tanzania,82426
Chukai,4.2332,103.4479,Malaysia,82425
Palmerston North,-40.3527,175.6072,New Zealand,82400
Nangong,37.3704,115.37,China,82386
Chimaltenango,14.662,-90.82,Guatemala,82370
Gießen,50.5837,8.65,Germany,82358
Troitsk,54.1056,61.5702,Russia,82338
Banská Bystrica,48.7333,19.15,Slovakia,82336
Kanoya,31.3833,130.85,Japan,82335
Kilis,36.7204,37.12,Turkey,82301
Fier,40.73,19.573,Albania,82297
Polatsk,55.4894,28.786,Belarus,82258
Asela,7.9504,39.1399,Ethiopia,82240
Bolgatanga,10.7904,-0.85,Ghana,82177
Abomey,7.1904,1.99,Benin,82154
Alexandria,31.2923,-92.4702,United States,82131
Chililabombwe,-12.3696,27.82,Zambia,82068
Melbourne,28.1084,-80.6628,United States,82011
Qasserine,35.1804,8.83,Tunisia,81987
Presidencia Roque Saenz Pena,-26.79,-60.45,Argentina,81879
Agboville,5.9403,-4.28,Côte D’Ivoire,81770
Kaspiysk,42.8747,47.6244,Russia,81752
Luján,-34.5796,-59.11,Argentina,81749
Westland,42.3192,-83.3805,United States,81747
Bendigo,-36.76,144.28,Australia,81657
Watampone,-4.5328,120.3334,Indonesia,81629
Campana,-34.16,-58.96,Argentina,81612
Sukhumi,43.02,41.02,Georgia,81546
Lavras,-21.2496,-45.01,Brazil,81472
Béziers,43.3505,3.21,France,81438
Mountain View,37.4,-122.0796,United States,81438
Balqash,46.8532,74.9502,Kazakhstan,81364
Somerville,42.3908,-71.1013,United States,81360
Bistrița,47.138,24.513,Romania,81318
Avaré,-23.11,-48.93,Brazil,81285
Asbest,57.023,61.458,Russia,81248
Formosa,-15.5395,-47.34,Brazil,81232
Pisco,-13.71,-76.22,Peru,81207
Cranston,41.7658,-71.4858,United States,81202
Salina Cruz,16.1671,-95.2,Mexico,81063
Farmington Hills,42.486,-83.3771,United States,81050
Hattiesburg,31.3072,-89.3168,United States,81036
Linares,-35.84,-71.59,Chile,81015
Lakewood,33.8471,-118.1221,United States,80967
Zomba,-15.39,35.31,Malawi,80932
Natitingou,10.3204,1.39,Benin,80892
Warwick,41.7062,-71.4334,United States,80871
Hobart,-42.85,147.295,Australia,80870
Williamsburg,37.2693,-76.7076,United States,80855
Saint Joseph,39.7598,-94.821,United States,80818
Abu Kamal,34.4504,40.9186,Syria,80808
Klin,56.3431,36.6987,Russia,80778
Auburn,47.3041,-122.211,United States,80776
Atakpamé,7.53,1.12,Togo,80683
Brooklyn Park,45.1112,-93.3505,United States,80581
Deerfield Beach,26.305,-80.1278,United States,80571
Bingöl,38.885,40.498,Turkey,80568
Tustin,33.7309,-117.8106,United States,80498
Necochea,-38.56,-58.75,Argentina,80478
Huacho,-11.11,-77.6199,Peru,80474
Alton,38.9033,-90.1523,United States,80462
Chino Hills,33.9508,-117.7254,United States,80374
Uvinza,-5.1196,30.39,Tanzania,80350
Kilifi,-3.6096,39.85,Kenya,80339
Mbalmayo,3.5204,11.5,Cameroon,80206
Lawrence,42.7003,-71.1626,United States,80162
Musan,42.2304,129.2304,"Korea, North",80146
Texarkana,33.4487,-94.0815,United States,80145
Meiganga,6.5205,14.29,Cameroon,80100
Al Karak,31.1851,35.7047,Jordan,80062
Vorkuta,67.5,64.01,Russia,80039
Nabatiye et Tahta,33.3833,35.45,Lebanon,80000
Capenda-Camulemba,-9.4196,18.43,Angola,80000
Xigaze,29.25,88.8833,China,80000
Koktokay,47.0004,89.4666,China,80000
Ciudad Mante,22.7334,-98.95,Mexico,79981
New Rochelle,40.9305,-73.7836,United States,79946
Fort Myers,26.6195,-81.8302,United States,79943
Goodyear,33.2614,-112.3622,United States,79858
Prachin Buri,14.0572,101.3768,Thailand,79757
Khaskovo,41.9438,25.5633,Bulgaria,79699
Quillota,-32.88,-71.26,Chile,79686
Erdenet,49.0533,104.1183,Mongolia,79647
Kropotkin,45.4471,40.5821,Russia,79599
Springdale,36.1898,-94.1573,United States,79599
Itumbiara,-18.3996,-49.21,Brazil,79582
Beni Mazar,28.4904,30.81,Egypt,79553
Ouahigouya,13.5704,-2.42,Burkina Faso,79504
Pharr,26.1686,-98.1904,United States,79487
Shadrinsk,56.0837,63.6333,Russia,79479
Abaetetuba,-1.7245,-48.8849,Brazil,79420
Valdosta,30.8503,-83.2789,United States,79294
Alameda,37.767,-122.2673,United States,79177
Kadoma,-18.33,29.9099,Zimbabwe,79174
Parma,41.3842,-81.7286,United States,79167
New Braunfels,29.6995,-98.1153,United States,79152
Kokomo,40.464,-86.1277,United States,79099
Newark,40.0705,-82.425,United States,79025
Paysandú,-32.33,-58.08,Uruguay,79016
Inowrocław,52.7799,18.25,Poland,79007
Slatina,44.435,24.371,Romania,78988
Kupyansk,49.7218,37.5981,Ukraine,78870
Shulan,44.4091,126.9487,China,78764
Sagaing,21.88,95.962,Burma,78739
Hania,35.5122,24.0156,Greece,78728
Cheyenne,41.1406,-104.7926,United States,78728
Três Lagoas,-20.79,-51.72,Brazil,78712
Biel,47.1666,7.25,Switzerland,78708
Gualeguaychú,-33.02,-58.52,Argentina,78676
Ceuta,35.889,-5.307,Spain,78674
Dondo,-19.6196,34.73,Mozambique,78648
Flagstaff,35.1872,-111.6195,United States,78628
São João del Rei,-21.13,-44.25,Brazil,78592
St.-Jerome,45.7666,-74,Canada,78439
Plymouth,45.0224,-93.4615,United States,78395
Franklin,35.9214,-86.8524,United States,78321
Pingyi,35.5104,117.62,China,78254
Umeå,63.83,20.24,Sweden,78197
Zahlé,33.8501,35.9042,Lebanon,78145
Florence,34.83,-87.6658,United States,78112
Wa,10.0604,-2.5,Ghana,78107
Milpitas,37.4338,-121.8921,United States,78106
Folsom,38.6669,-121.1422,United States,78038
Kankakee,41.102,-87.8643,United States,78001
Lebanon,40.3412,-76.4228,United States,77973
Gangtok,27.3333,88.6166,India,77900
Perris,33.7899,-117.2233,United States,77879
Marsala,37.8054,12.4387,Italy,77784
Bellflower,33.888,-118.1271,United States,77772
Linkou,45.2819,130.2519,China,77754
Boynton Beach,26.5282,-80.0811,United States,77702
Watsonville,36.9205,-121.7706,United States,77700
Hakkâri,37.5744,43.7408,Turkey,77699
Numan,9.4604,12.04,Nigeria,77617
Kars,40.6085,43.0975,Turkey,77486
Anderson,34.5212,-82.6479,United States,77426
Itaúna,-20.06,-44.57,Brazil,77400
Söke,37.7512,27.4103,Turkey,77341
Elizabethtown,37.703,-85.8772,United States,77317
Kayes,14.45,-11.44,Mali,77207
Wheeling,40.0755,-80.6951,United States,77206
Ende,-8.8623,121.6489,Indonesia,77205
San Carlos,9.658,-68.59,Venezuela,77192
Jiexiu,37.04,111.9,China,77178
Ovalle,-30.59,-71.2001,Chile,77138
São Mateus,-18.7296,-39.86,Brazil,77117
Butare,-2.5896,29.73,Rwanda,77000
Upland,34.1178,-117.6603,United States,76999
La Rochelle,46.1667,-1.15,France,76997
Thakhek,17.4112,104.8361,Laos,76928
Sarqan,45.4203,79.9149,Kazakhstan,76919
Karur,10.9504,78.0833,India,76915
Baytown,29.7607,-94.9628,United States,76804
Battle Creek,42.2985,-85.2296,United States,76803
Pori,61.4789,21.7749,Finland,76772
San Felipe,10.336,-68.746,Venezuela,76766
Porterville,36.0644,-119.0337,United States,76729
Oudtshoorn,-33.58,22.19,South Africa,76708
Loveland,40.4167,-105.0621,United States,76701
Layton,41.0771,-111.9622,United States,76691
Flower Mound,33.0344,-97.1147,United States,76681
Uttaradit,17.6316,100.0972,Thailand,76630
Hammond,41.617,-87.4908,United States,76618
Lake Jackson,29.0516,-95.4522,United States,76565
Jataí,-17.8796,-51.75,Brazil,76547
São João da Boa Vista,-21.98,-46.79,Brazil,76540
Davis,38.5552,-121.7365,United States,76524
Al Musayyib,32.7786,44.29,Iraq,76454
Zephyrhills,28.2407,-82.1797,United States,76416
Baldwin Park,34.0829,-117.972,United States,76402
Tucuruí,-3.68,-49.72,Brazil,76337
Honiara,-9.438,159.9498,Solomon Islands,76328
Masvingo,-20.0596,30.82,Zimbabwe,76311
Babahoyo,-1.7996,-79.54,Ecuador,76279
Tuban,-6.8995,112.05,Indonesia,76242
Sakhon Nakhon,17.1679,104.1479,Thailand,76237
Birobidzhan,48.7974,132.9508,Russia,76146
Altoona,40.5082,-78.4007,United States,76096
Gary,41.5906,-87.3472,United States,76008
Tamanrasset,22.785,5.5228,Algeria,76000
Tailai,46.3904,123.41,China,75992
Wyoming,42.8909,-85.7066,United States,75938
Saint Augustine,29.8979,-81.31,United States,75932
San Ramon,37.7625,-121.9365,United States,75931
Mackay,-21.1439,149.15,Australia,75922
Kamensk Shakhtinskiy,48.3318,40.2518,Russia,75814
Buynaksk,42.8335,47.113,Russia,75800
Bethlehem,40.6266,-75.3679,United States,75707
Cedar Park,30.5105,-97.8198,United States,75704
Arlington Heights,42.0956,-87.9825,United States,75634
Galway,53.2724,-9.0488,Ireland,75594
Nevşehir,38.624,34.724,Turkey,75527
Campo Murao,-24.0496,-52.42,Brazil,75401
Union City,37.603,-122.0187,United States,75343
Kompong Chhnang,12.2505,104.6666,Cambodia,75244
Agrinio,38.6218,21.4077,Greece,75233
Bolingbrook,41.6903,-88.102,United States,75201
Anniston,33.6713,-85.8136,United States,75169
Oshkosh,44.0228,-88.5616,United States,75154
Idah,7.1104,6.7399,Nigeria,75087
Bombo,0.5833,32.5333,Uganda,75000
Gode,5.95,43.45,Ethiopia,75000
Red Deer,52.2666,-113.8,Canada,74857
Evanston,42.0463,-87.6942,United States,74756
Darhan,49.6167,106.35,Mongolia,74738
Cachoeira do Sul,-30.03,-52.91,Brazil,74694
Camarillo,34.223,-119.0323,United States,74682
Greenock,55.9333,-4.75,United Kingdom,74635
Toledo,39.867,-4.0167,Spain,74632
Camden,39.9361,-75.1073,United States,74532
Manokwari,-0.8711,134.0693,Indonesia,74504
Hilton Head Island,32.1896,-80.7499,United States,74500
Missouri City,29.5635,-95.5377,United States,74497
Shanxian,34.7904,116.08,China,74459
San Marcos,29.8734,-97.9382,United States,74212
Rochester Hills,42.6645,-83.1563,United States,74205
Schaumburg,42.0307,-88.0838,United States,74184
Karlstad,59.3671,13.4999,Sweden,74141
Kara Balta,42.8306,73.8857,Kyrgyzstan,74133
San Ramón de la Nueva Orán,-23.14,-64.32,Argentina,74059
Winchester,39.1735,-78.1746,United States,74031
Harrisonburg,38.4362,-78.8735,United States,74023
Standerton,-26.9395,29.24,South Africa,74021
Riberalta,-10.983,-66.1,Bolivia,74014
Prey Veng,11.484,105.324,Cambodia,74000
Cozumel,20.51,-86.95,Mexico,73934
Wausau,44.9615,-89.6436,United States,73933
Kiffa,16.62,-11.4,Mauritania,73930
Jonesboro,35.8212,-90.6795,United States,73788
Grand Bassam,5.2004,-3.75,Côte D’Ivoire,73772
Jackson,35.6533,-88.8352,United States,73685
Farah,32.3917,62.0968,Afghanistan,73647
Munchon,39.3813,127.2517,"Korea, North",73619
Bawku,11.0604,-0.24,Ghana,73594
Rancho Cordova,38.5739,-121.2521,United States,73563
Sundsvall,62.4001,17.3167,Sweden,73389
Onitsha,6.1404,6.78,Nigeria,73374
Mandurah,-32.5235,115.7471,Australia,73356
Mpanda,-6.3596,31.05,Tanzania,73338
Skien,59.2,9.6,Norway,73330
Roanne,46.0333,4.0667,France,73315
Bonao,18.942,-70.409,Dominican Republic,73269
Cuamba,-14.7896,36.54,Mozambique,73268
Călărași,44.2063,27.3259,Romania,73224
Tatvan,38.5066,42.2816,Turkey,73222
General Roca,-39.02,-67.61,Argentina,73212
Southfield,42.4765,-83.2605,United States,73208
Tokar,18.4333,37.7333,Sudan,73202
Owensboro,37.7575,-87.1172,United States,73173
Apple Valley,34.5329,-117.2102,United States,73077
Nekemte,9.0905,36.53,Ethiopia,73018
Pasco,46.2503,-119.1298,United States,73013
Korosten,50.9504,28.65,Ukraine,72984
San Juan,18.807,-71.229,Dominican Republic,72950
Dabou,5.3204,-4.3899,Côte D’Ivoire,72913
Conway,35.0753,-92.4695,United States,72894
Lodi,38.1218,-121.2932,United States,72890
Guadalajara,40.6337,-3.1666,Spain,72850
Quảng Trị,16.7504,107.2,Vietnam,72722
New Britain,41.6758,-72.7862,United States,72710
Tamazunchale,21.2704,-98.78,Mexico,72685
Georgievsk,44.1599,43.4699,Russia,72649
Mansfield,40.7656,-82.5275,United States,72635
Carlisle,54.88,-2.93,United Kingdom,72633
Lanxi,46.2664,126.276,China,72528
Waukesha,43.0087,-88.2464,United States,72489
Launceston,-41.4498,147.1302,Australia,72458
Morgantown,39.638,-79.9468,United States,72453
Keshan,48.0263,125.866,China,72403
Bacabal,-4.23,-44.8,Brazil,72372
Venado Tuerto,-33.7496,-61.97,Argentina,72340
Bourges,47.0837,2.4,France,72340
Goya,-29.14,-59.27,Argentina,72304
Montepuez,-13.1196,39,Mozambique,72279
As Suwayda,32.7004,36.5666,Syria,72248
Esbjerg,55.467,8.45,Denmark,72205
Pittsburg,38.019,-121.8969,United States,72141
Sumter,33.9392,-80.393,United States,72131
Chusovoy,58.2934,57.813,Russia,72113
Nizwa,22.9264,57.5314,Oman,72076
Pawtucket,41.8743,-71.3743,United States,72001
Lauderhill,26.1605,-80.2241,United States,71970
Cleveland,35.1817,-84.8707,United States,71944
Chalkida,38.464,23.6124,Greece,71842
Kalamata,37.0389,22.1142,Greece,71823
Andkhvoy,36.9317,65.1015,Afghanistan,71730
Vratsa,43.21,23.5625,Bulgaria,71633
Dothan,31.2336,-85.4068,United States,71620
Chernogorsk,53.8313,91.2227,Russia,71582
Porto União,-26.2396,-51.08,Brazil,71578
Redlands,34.0512,-117.171,United States,71554
Goiana,-7.5596,-35,Brazil,71549
Monastir,35.7307,10.7673,Tunisia,71546
Wenatchee,47.4338,-120.3285,United States,71512
Çankırı,40.607,33.621,Turkey,71379
Upington,-28.46,21.23,South Africa,71373
Mardin,37.3115,40.7427,Turkey,71373
Kovel,51.2171,24.7166,Ukraine,71301
Sotik,-0.6796,35.12,Kenya,71285
Asti,44.93,8.21,Italy,71276
Zadar,44.1201,15.2623,Croatia,71258
Passaic,40.8574,-74.1282,United States,71247
Ijuí,-28.3895,-53.9199,Brazil,71202
Anlu,31.27,113.67,China,71198
Salima,-13.7829,34.4333,Malawi,71181
Mamou,10.3804,-12.1,Guinea,71153
Comayagua,14.4604,-87.65,Honduras,71142
Wilmington,39.7415,-75.5413,United States,71106
Lynwood,33.924,-118.2017,United States,71099
Muyinga,-2.8523,30.3173,Burundi,71076
Maple Grove,45.1089,-93.4626,United States,71066
Pocatello,42.8716,-112.4656,United States,71020
South Jordan,40.5571,-111.9782,United States,70954
Weston,26.1006,-80.4057,United States,70944
Altamira,-3.1996,-52.21,Brazil,70888
Saraburi,14.5304,100.88,Thailand,70769
Debre Markos,10.34,37.72,Ethiopia,70758
Paracatu,-17.1996,-46.87,Brazil,70753
Georgetown,30.6664,-97.6937,United States,70685
Ali Bayramli,39.9323,48.9203,Azerbaijan,70684
Lethbridge,49.7005,-112.8333,Canada,70617
Mindelo,16.8838,-25,Cabo Verde,70611
Byumba,-1.5796,30.06,Rwanda,70593
Saint Gallen,47.423,9.362,Switzerland,70572
Scarborough,54.2804,-0.43,United Kingdom,70571
Tatabánya,47.55,18.433,Hungary,70541
Janesville,42.6855,-89.0136,United States,70518
Volsk,52.0347,47.3743,Russia,70500
Baiquan,47.6018,126.0819,China,70472
North Richland Hills,32.8605,-97.218,United States,70441
Kastamonu,41.389,33.783,Turkey,70402
Union City,40.7674,-74.0323,United States,70387
Iguatu,-6.36,-39.3,Brazil,70380
Saint Charles,38.7958,-90.5159,United States,70329
Sunyani,7.336,-2.336,Ghana,70299
Châu Đốc,10.7004,105.1167,Vietnam,70239
Belogorsk,50.9191,128.4637,Russia,70203
Karakol,42.492,78.3818,Kyrgyzstan,70171
Lisala,2.14,21.51,Congo (Kinshasa),70087
Rongzhag,30.9504,101.9167,China,70000
Sheboygan,43.7447,-87.7322,United States,69920
Homestead,25.4664,-80.4472,United States,69907
Bristol,36.5572,-82.2144,United States,69865
Lobatse,-25.2196,25.68,Botswana,69804
Lima,40.7409,-84.1121,United States,69798
Trnava,48.3666,17.6,Slovakia,69785
Walnut Creek,37.9025,-122.0398,United States,69773
Woodbury,44.9057,-92.923,United States,69756
Totonicapán,14.914,-91.358,Guatemala,69734
Ouezzane,34.8103,-5.57,Morocco,69658
Arba Minch,6.04,37.55,Ethiopia,69622
Rio Verde,21.93,-99.98,Mexico,69613
Paragominas,-2.9596,-47.49,Brazil,69613
Tuy Hòa,13.082,109.316,Vietnam,69596
Guajara-Miram,-10.8,-65.3499,Brazil,69586
West Bend,43.4184,-88.1822,United States,69577
Mount Vernon,48.4202,-122.3116,United States,69528
Villa Carlos Paz,-31.42,-64.5,Argentina,69451
Jaboticabal,-21.25,-48.33,Brazil,69394
Bafia,4.7504,11.23,Cameroon,69270
Kolda,12.9104,-14.95,Senegal,69267
Arauca,7.0907,-70.7616,Colombia,69264
Vaslui,46.6333,27.7333,Romania,69225
Hasselt,50.964,5.484,Belgium,69222
Ongjin,37.9371,125.3571,"Korea, North",69195
Hammond,30.506,-90.456,United States,69180
Azogues,-2.74,-78.84,Ecuador,69087
Giurgiu,43.93,25.84,Romania,69067
Daphne,30.6291,-87.8872,United States,69065
Potenza,40.642,15.799,Italy,69060
Ayr,55.4504,-4.6167,United Kingdom,69042
Jorhat,26.75,94.2167,India,69033
Mocuba,-16.8496,38.26,Mozambique,68984
Ragusa,36.93,14.73,Italy,68956
Liuhe,42.2789,125.7173,China,68938
Güines,22.8361,-82.028,Cuba,68935
Mansfield,32.569,-97.1211,United States,68928
Timbuktu,16.7666,-3.0166,Mali,68872
Wum,6.4004,10.07,Cameroon,68836
Chulucanas,-5.0896,-80.17,Peru,68835
Tuymazy,54.6048,53.6943,Russia,68829
Decatur,34.573,-86.9905,United States,68816
Oranjestad,12.5304,-70.029,Aruba,68775
Al Ahmadi,29.0769,48.0838,Kuwait,68763
Delray Beach,26.455,-80.0905,United States,68749
Saywun,15.943,48.7873,Yemen,68747
Kamloops,50.6667,-120.3333,Canada,68714
Gaithersburg,39.1347,-77.213,United States,68710
Mount Vernon,40.9136,-73.8291,United States,68703
Palatine,42.1181,-88.043,United States,68644
Gävle,60.667,17.1666,Sweden,68635
Borisoglebsk,51.3687,42.0887,Russia,68597
Dubuque,42.5007,-90.7067,United States,68573
Bossier City,32.523,-93.6666,United States,68554
Sabanalarga,10.64,-74.92,Colombia,68535
L'Aquila,42.3504,13.39,Italy,68503
Buckeye,33.4318,-112.643,United States,68453
Rockville,39.0834,-77.1553,United States,68401
Broomfield,39.9541,-105.0527,United States,68341
Türkmenbaşy,40.023,52.9697,Turkmenistan,68292
Saldanha,-33.01,17.93,South Africa,68284
Victoria,28.8285,-96.985,United States,68271
Matara,5.949,80.5428,Sri Lanka,68244
Lodja,-3.4896,23.42,Congo (Kinshasa),68244
Yorba Linda,33.889,-117.7714,United States,68229
Oturkpo,7.1904,8.13,Nigeria,68220
Ames,42.0261,-93.6279,United States,68156
Narathiwat,6.4318,101.8214,Thailand,68112
Artemisa,22.8134,-82.7619,Cuba,68073
Balsas,-7.52,-46.05,Brazil,68056
Daytona Beach,29.1995,-81.0982,United States,68055
Putrajaya,2.914,101.7019,Malaysia,67964
Calbayog,12.0672,124.6042,Philippines,67921
Redondo Beach,33.8574,-118.3766,United States,67908
Concepción del Uruguay,-32.48,-58.24,Argentina,67895
Garissa,-0.4396,39.67,Kenya,67861
Minxian,34.4362,104.0306,China,67826
Carbondale,37.722,-89.2238,United States,67807
Deva,45.8833,22.9167,Romania,67802
Khanty Mansiysk,61.0015,69.0015,Russia,67800
Ishim,56.1502,69.4498,Russia,67762
Matehuala,23.6604,-100.65,Mexico,67717
Hanover,39.8117,-76.9835,United States,67679
Juchitan,16.43,-95.02,Mexico,67637
Saratoga Springs,43.0674,-73.7775,United States,67582
DeKalb,41.9312,-88.7483,United States,67500
Soyo,-6.1296,12.37,Angola,67491
Casper,42.8421,-106.3208,United States,67462
Kenner,30.0109,-90.2549,United States,67451
South San Francisco,37.6536,-122.4197,United States,67429
Santa Inês,-3.66,-45.39,Brazil,67424
El Bayadh,33.6904,1.01,Algeria,67413
Oktyabrskiy,52.6636,156.2387,Russia,67386
Sherman,33.6266,-96.6195,United States,67354
Dimbokro,6.6505,-4.71,Côte D’Ivoire,67349
Petaluma,38.2423,-122.6267,United States,67316
Tejen,37.3786,60.496,Turkmenistan,67294
Kasese,0.2325,29.9883,Uganda,67269
Tzaneen,-23.8195,30.17,South Africa,67245
Jelgava,56.6527,23.7128,Latvia,67207
Lao Chi,22.5014,103.966,Vietnam,67206
Bayonne,40.6659,-74.1141,United States,67186
Palo Alto,37.3913,-122.1467,United States,67178
Puerto Maldonado,-12.6,-69.1833,Peru,67155
Mbaïki,3.8704,18,Central African Republic,67132
Weirton,40.406,-80.5671,United States,67082
Bay City,43.5903,-83.8886,United States,67059
Jaltipan,17.94,-94.74,Mexico,66998
Narva,59.3776,28.1603,Estonia,66980
Apatity,67.5731,33.393,Russia,66907
Kati,12.7504,-8.08,Mali,66895
Aleksin,54.5143,37.0944,Russia,66885
Kissidougou,9.1905,-10.12,Guinea,66815
Baní,18.28,-70.331,Dominican Republic,66709
Las Heras,-32.825,-68.8017,Argentina,66663
Eagan,44.817,-93.1638,United States,66627
Los Lunas,34.8114,-106.7808,United States,66613
Nalut,31.8804,10.97,Libya,66609
Mansehra,34.3418,73.1968,Pakistan,66486
Corvallis,44.5697,-123.278,United States,66441
Rogers,36.3173,-94.1514,United States,66430
Lake Elsinore,33.6843,-117.3348,United States,66411
Kungur,57.4348,56.9543,Russia,66389
Klintsy,52.7652,32.2448,Russia,66336
Laguna Niguel,33.5275,-117.705,United States,66334
Neryungri,56.674,124.7104,Russia,66320
Huinan,42.6229,126.2614,China,66315
Lahij,13.0582,44.8838,Yemen,66288
Leninogorsk,54.5987,52.4487,Russia,66263
Pyongsan,38.3367,126.3866,"Korea, North",66260
Grand Forks,47.9223,-97.0887,United States,66159
Burdur,37.7167,30.2833,Turkey,66158
Alba Lulia,46.077,23.58,Romania,66085
Morón,22.1099,-78.6275,Cuba,66060
Lesosibirsk,58.2433,92.4833,Russia,65945
North Little Rock,34.7814,-92.2378,United States,65911
Lahat,-3.8,103.5333,Indonesia,65906
Rockhampton,-23.3639,150.52,Australia,65850
Chabahar,25.3004,60.6299,Iran,65801
Alpharetta,34.0704,-84.2739,United States,65799
Polevskoy,56.4434,60.188,Russia,65770
Sodo,6.9,37.75,Ethiopia,65737
Tamarac,26.2058,-80.2547,United States,65669
Schenectady,42.8025,-73.9276,United States,65625
Great Falls,47.5022,-111.2995,United States,65624
Longview,46.146,-122.963,United States,65619
West Des Moines,41.5527,-93.7805,United States,65608
Phyarpon,16.2933,95.6829,Burma,65601
Rio Negro,-26.1,-49.79,Brazil,65597
Panaji,15.492,73.818,India,65586
Prince George,53.9167,-122.7667,Canada,65558
Shawnee,39.0158,-94.8076,United States,65513
Santo Ângelo,-28.3,-54.28,Brazil,65420
Bani Walid,31.7704,13.99,Libya,65392
East Orange,40.7651,-74.2117,United States,65378
Masaka,-0.3296,31.73,Uganda,65373
Kumertau,52.7748,55.7843,Russia,65321
San Clemente,33.4498,-117.6103,United States,65267
Birni Nkonni,13.7904,5.2599,Niger,65252
Debre Birhan,9.6804,39.53,Ethiopia,65231
Békéscsaba,46.672,21.101,Hungary,65206
Cobán,15.47,-90.38,Guatemala,65194
Michigan City,41.7098,-86.8705,United States,65144
Ji-Paraná,-10.8333,-61.967,Brazil,65016
Borås,57.7304,12.92,Sweden,65008
Solwezi,-12.1796,26.4,Zambia,65000
Jupiter,26.9199,-80.1127,United States,64976
Saki,41.1923,47.1705,Azerbaijan,64968
Krasnoturinsk,59.7948,60.4848,Russia,64878
Tan Tan,28.4304,-11.1,Morocco,64868
Wellington,26.6464,-80.2707,United States,64848
Rocklin,38.8075,-121.2488,United States,64838
Gurupi,-11.7196,-49.06,Brazil,64789
Rafha,29.6202,43.4948,Saudi Arabia,64755
Rocky Mount,35.9676,-77.8047,United States,64732
Fairbanks,64.8353,-147.6533,United States,64732
Feyzabad,37.1298,70.5792,Afghanistan,64704
Elmira,42.0938,-76.8097,United States,64664
Mazatenango,14.5304,-91.51,Guatemala,64652
Binga,2.3834,20.42,Congo (Kinshasa),64639
Johnstown,40.3258,-78.9194,United States,64615
Blaine,45.1696,-93.2077,United States,64557
Puerto Madryn,-42.77,-65.04,Argentina,64555
Sammamish,47.6019,-122.0419,United States,64548
Parintins,-2.61,-56.74,Brazil,64428
Nepalganj,28.0503,81.6167,Nepal,64400
Eden Prairie,44.8488,-93.4595,United States,64400
Tikhoretsk,45.8531,40.1377,Russia,64387
Redmond,47.6762,-122.1166,United States,64291
Glens Falls,43.3109,-73.6459,United States,64287
Taloqan,36.73,69.54,Afghanistan,64256
Parkersburg,39.2623,-81.5419,United States,64253
Qinggang,46.69,126.1,China,64182
Arras,50.2833,2.7833,France,64165
Ciudad Hidalgo,19.68,-100.57,Mexico,64154
Zrenjanin,45.3786,20.3995,Serbia,64053
Mazabuka,-15.86,27.76,Zambia,64006
Skokie,42.0359,-87.74,United States,63978
Curvelo,-18.7596,-44.43,Brazil,63954
Colón,22.7196,-80.9058,Cuba,63882
Kangar,6.433,100.19,Malaysia,63869
Ramla,31.9167,34.8667,Israel,63860
Tulare,36.1996,-119.34,United States,63855
Kristiansand,58.1666,8,Norway,63814
Lakeville,44.6776,-93.2521,United States,63748
Caçador,-26.77,-51.02,Brazil,63726
Kanchanaburi,14.0174,99.522,Thailand,63699
Haverhill,42.7838,-71.0871,United States,63639
Irecê,-11.3,-41.87,Brazil,63626
Svobodnyy,51.4062,128.1312,Russia,63620
Catalão,-18.18,-47.95,Brazil,63544
Zarafshon,41.5822,64.2018,Uzbekistan,63543
Pico Rivera,33.9902,-118.0888,United States,63522
Samut Sakhon,13.536,100.274,Thailand,63498
Beloit,42.523,-89.0184,United States,63498
Kakamega,0.2904,34.73,Kenya,63426
Sefra,32.7604,-0.5799,Algeria,63420
Rzhev,56.2574,34.3275,Russia,63414
Cahul,45.9079,28.1944,Moldova,63407
Bhairawa,27.5333,83.3833,Nepal,63367
Pflugerville,30.4528,-97.6022,United States,63359
Molepolole,-24.4,25.51,Botswana,63248
Zalău,47.175,23.063,Romania,63232
Vilhena,-12.7166,-60.1166,Brazil,63231
Valença,-13.3596,-39.08,Brazil,63231
Eastvale,33.9617,-117.5802,United States,63211
Port Orange,29.1084,-81.0136,United States,63203
Montebello,34.0155,-118.1108,United States,63192
Encinitas,33.0492,-117.2613,United States,63184
Medicine Hat,50.0333,-110.6833,Canada,63138
Knysna,-34.0329,23.0333,South Africa,63106
Balakhna,56.4943,43.5944,Russia,63083
Bossangoa,6.4837,17.45,Central African Republic,63064
Sopore,34.3,74.4667,India,63035
Belize City,17.4987,-88.1884,Belize,63028
Kasongo,-4.45,26.66,Congo (Kinshasa),63000
Coffs Harbour,-30.3071,153.1123,Australia,62978
Machiques,10.0704,-72.5499,Venezuela,62968
Itapeva,-23.9796,-48.88,Brazil,62957
Beledweyne,4.74,45.2,Somalia,62945
Graaff Reinet,-32.3,24.54,South Africa,62896
Balboa,8.95,-79.5667,Panama,62882
Rowlett,32.9156,-96.5488,United States,62868
Monessen,40.1519,-79.8828,United States,62833
Sebring,27.477,-81.453,United States,62814
Bitlis,38.394,42.123,Turkey,62811
Lehi,40.4137,-111.8728,United States,62712
Guamúchil,25.4704,-108.09,Mexico,62695
Nkawkaw,6.5505,-0.78,Ghana,62667
Coon Rapids,45.1755,-93.3094,United States,62656
Belebey,54.1291,54.1187,Russia,62582
Tataouine,33,10.4667,Tunisia,62577
Surin,14.8868,103.4915,Thailand,62536
Kayes,-4.18,13.28,Congo (Brazzaville),62521
La Habra,33.9278,-117.9513,United States,62466
Waltham,42.3889,-71.2423,United States,62442
Brentwood,37.9355,-121.7191,United States,62433
Singida,-4.8196,34.74,Tanzania,62432
Ankeny,41.728,-93.6031,United States,62416
San Luis Obispo,35.2671,-120.6689,United States,62398
Tanjungpandan,-2.75,107.65,Indonesia,62374
Springfield,44.0538,-122.9811,United States,62353
Council Bluffs,41.2369,-95.8517,United States,62316
Castle Rock,39.3761,-104.8534,United States,62276
Assen,53,6.55,Netherlands,62237
North Miami,25.9006,-80.1681,United States,62225
Chistopol,55.3648,50.6407,Russia,62200
Bambari,5.762,20.6672,Central African Republic,62098
Hamilton,39.3938,-84.5653,United States,62092
Tikhvin,59.6448,33.5144,Russia,62075
Sagua la Grande,22.809,-80.0711,Cuba,62073
Tupã,-21.93,-50.52,Brazil,62035
Madang,-5.2248,145.7853,Papua New Guinea,62023
Veszprém,47.091,17.911,Hungary,62023
Ferkessédougou,9.6004,-5.2,Côte D’Ivoire,62008
Labinsk,44.6348,40.7443,Russia,61945
Fernandópolis,-20.2696,-50.26,Brazil,61931
Apia,-13.8415,-171.7386,Samoa,61916
Mankato,44.1712,-93.9773,United States,61912
Zalaegerszeg,46.844,16.84,Hungary,61898
Noblesville,40.0353,-86.006,United States,61882
Bamian,34.8211,67.521,Afghanistan,61863
Bassar,9.261,0.789,Togo,61845
Moca,19.397,-70.523,Dominican Republic,61834
Iskitim,54.6509,83.2865,Russia,61827
Berbérati,4.25,15.78,Central African Republic,61815
Benevento,41.1337,14.75,Italy,61791
Chinhoyi,-17.3596,30.18,Zimbabwe,61739
Medenine,33.4,10.4167,Tunisia,61705
Troyes,48.3404,4.0834,France,61703
Vyska,55.3247,42.1644,Russia,61664
Gadsden,34.009,-86.0156,United States,61656
Pula,44.8687,13.8481,Croatia,61599
Sibay,52.7091,58.6387,Russia,61590
Cayenne,4.933,-52.33,French Guiana,61550
Ponta Delgada,37.7483,-25.6666,Portugal,61526
Moore,35.3294,-97.4758,United States,61523
Fengcheng,28.2004,115.77,China,61469
Burnsville,44.7648,-93.2795,United States,61439
Stralsund,54.3004,13.1,Germany,61368
National City,32.6654,-117.0983,United States,61363
Civitavecchia,42.1004,11.8,Italy,61316
Taylor,42.226,-83.2688,United States,61276
Malden,42.4305,-71.0576,United States,61246
Portimão,37.1337,-8.5333,Portugal,61226
Gaalkacyo,6.77,47.43,Somalia,61200
Doral,25.8149,-80.3565,United States,61130
Coburg,50.2666,10.9666,Germany,61054
Marietta,33.9532,-84.5421,United States,61048
Monterey Park,34.0497,-118.1325,United States,61044
Yopal,5.347,-72.406,Colombia,61029
Coconut Creek,26.2803,-80.1842,United States,61010
Salsk,46.4775,41.542,Russia,61000
Cherbourg,49.6504,-1.65,France,60991
El Carmen de Bolívar,9.7204,-75.13,Colombia,60980
Rome,34.2662,-85.1862,United States,60966
Bouaflé,6.978,-5.748,Côte D’Ivoire,60962
Dublin,37.7161,-121.8964,United States,60939
Sonbong,42.3377,130.4027,"Korea, North",60864
Tartagal,-22.55,-63.81,Argentina,60819
Canela,-29.36,-50.81,Brazil,60806
Nelson,-41.2926,173.2474,New Zealand,60800
Albany,44.6274,-123.0966,United States,60795
Cupertino,37.3168,-122.0465,United States,60777
San Fernando,-34.58,-70.99,Chile,60746
Shuya,56.8543,41.3643,Russia,60705
Sfintu-Gheorghe,45.868,25.793,Romania,60677
Tidore,0.6964,127.436,Indonesia,60611
Lokoja,7.8004,6.7399,Nigeria,60579
Langzhong,31.5759,105.9656,China,60542
Pirassununga,-21.99,-47.43,Brazil,60413
Khujayli,42.4047,59.4517,Uzbekistan,60401
Morristown,36.2043,-83.3001,United States,60316
Lakewood,47.1628,-122.5299,United States,60296
Banfora,10.6304,-4.76,Burkina Faso,60288
Zima,53.9331,102.0331,Russia,60239
Gardena,33.8944,-118.3073,United States,60224
Bristol,41.6812,-72.9407,United States,60223
Millcreek,40.6892,-111.8291,United States,60192
Mbanza-Congo,-6.2696,14.24,Angola,60182
Lankaran,38.754,48.8511,Azerbaijan,60180
Pirapora,-17.33,-44.93,Brazil,60164
Caratinga,-19.79,-42.14,Brazil,60066
Woodland,38.6712,-121.75,United States,60062
La Mesa,32.7703,-117.0204,United States,60021
Crotone,39.0833,17.1233,Italy,60010
Uíge,-7.62,15.05,Angola,60008
Taylorsville,40.6569,-111.9493,United States,59992
Benton Harbor,42.1159,-86.4488,United States,59939
West Allis,43.0068,-88.0296,United States,59934
Meriden,41.5367,-72.7943,United States,59927
Kotlas,61.2631,46.6631,Russia,59879
Gorno Altaysk,51.9613,85.9577,Russia,59868
Chapel Hill,35.9269,-79.039,United States,59862
Nkhotakota,-12.9163,34.3,Malawi,59854
Pontiac,42.6493,-83.2878,United States,59792
Linares,38.0833,-3.6334,Spain,59761
Itapetinga,-15.25,-40.25,Brazil,59721
Novi,42.4786,-83.4893,United States,59715
Saint Clair Shores,42.4921,-82.8957,United States,59635
Beckley,37.7878,-81.1841,United States,59629
São Borja,-28.6596,-56.01,Brazil,59613
Växjö,56.8837,14.8167,Sweden,59600
Leticia,-4.22,-69.94,Colombia,59575
Béja,36.7304,9.19,Tunisia,59567
Drummondville,45.8833,-72.4834,Canada,59489
Truc Giang,10.235,106.375,Vietnam,59442
Carazinho,-28.29,-52.8,Brazil,59417
Dengzhou,32.6804,112.08,China,59338
Sanford,28.7891,-81.2757,United States,59317
San Felipe,-32.75,-70.72,Chile,59294
Santa Rosa,-27.8695,-54.46,Brazil,59281
Lappeenranta,61.0671,28.1833,Finland,59276
Kavala,40.9412,24.4018,Greece,59240
Gannan,47.9204,123.51,China,59239
Azua,18.454,-70.729,Dominican Republic,59139
Midland,43.6239,-84.2315,United States,59138
Viedma,-40.8,-63,Argentina,59122
Concepción,-23.4064,-57.4344,Paraguay,59118
Royal Oak,42.5084,-83.1539,United States,59112
Bangor,44.8322,-68.7906,United States,59107
Manacapuru,-3.2896,-60.62,Brazil,59102
Bartlett,35.2337,-89.8195,United States,59102
San Rafael,37.9905,-122.5222,United States,59070
Mt. Hagen,-5.8632,144.2168,Papua New Guinea,59064
San Francisco,-31.43,-62.09,Argentina,59062
White Plains,41.022,-73.7548,United States,59047
Kabinda,-6.1296,24.48,Congo (Kinshasa),59004
Goldsboro,35.3777,-77.972,United States,58972
Mikhaylovka,50.0679,43.2175,Russia,58898
Solnechnogorsk,56.1807,36.9809,Russia,58891
Telêmaco Borba,-24.33,-50.62,Brazil,58880
Guanambi,-14.2296,-42.79,Brazil,58877
Bowie,38.9575,-76.7421,United States,58859
Tezpur,26.6338,92.8,India,58851
Huntington Park,33.98,-118.2167,United States,58822
Arcadia,34.1342,-118.0373,United States,58799
Lewiston,44.0915,-70.1681,United States,58796
Kamphaeng Phet,16.473,99.529,Thailand,58787
Columbus,39.2091,-85.918,United States,58771
Orland Park,41.6075,-87.8619,United States,58765
Arsenyev,44.1623,133.2823,Russia,58700
Casa Grande,32.907,-111.7624,United States,58632
Embu,-0.5196,37.45,Kenya,58620
Aketi,2.7405,23.78,Congo (Kinshasa),58601
Staunton,38.1593,-79.0611,United States,58470
San Pedro,-24.2196,-64.87,Argentina,58430
Margate,26.2465,-80.2119,United States,58430
Chaiyaphum,15.804,102.0386,Thailand,58350
Bondoukou,8.0304,-2.8,Côte D’Ivoire,58297
Jefferson City,38.5677,-92.1757,United States,58279
Korçë,40.6167,20.7667,Albania,58259
San Andrés,12.5621,-81.6903,Colombia,58257
Kırklareli,41.743,27.226,Turkey,58223
Agen,44.2004,0.6333,France,58223
Des Plaines,42.0344,-87.9008,United States,58193
Rundu,-17.92,19.7499,Namibia,58172
Santee,32.8555,-116.9856,United States,58113
Ariquemes,-9.9396,-63.08,Brazil,58096
Hai Duong,20.942,106.331,Vietnam,58030
Ushuaia,-54.79,-68.31,Argentina,58028
Middletown,41.4458,-74.4228,United States,57973
Allanmyo,19.3783,95.2279,Burma,57897
Borovichi,58.3978,33.8974,Russia,57887
Angoche,-16.23,39.91,Mozambique,57835
Hot Springs,34.4902,-93.0498,United States,57819
Napier,-39.49,176.9265,New Zealand,57800
Medford,42.4234,-71.1087,United States,57797
Suileng,47.246,127.106,China,57789
Walla Walla,46.067,-118.3365,United States,57779
Lop Buri,14.804,100.6186,Thailand,57761
Qunghirot,43.0704,58.9,Uzbekistan,57758
Linares,24.8604,-99.57,Mexico,57731
Tiznit,29.7104,-9.74,Morocco,57705
Timbaúba,-7.4996,-35.32,Brazil,57534
Carson City,39.1512,-119.7474,United States,57525
Hendersonville,36.3063,-86.5997,United States,57517
Titusville,28.5727,-80.8193,United States,57497
Picos,-7.08,-41.44,Brazil,57495
Stepanakert,39.8156,46.752,Azerbaijan,57473
Kentau,43.5165,68.5199,Kazakhstan,57408
Cheremkhovo,53.1588,103.0739,Russia,57395
Greenwood,39.6019,-86.1073,United States,57375
Caborca,30.7161,-112.1642,Mexico,57357
Midwest City,35.463,-97.371,United States,57308
Manhattan,39.1882,-96.6053,United States,57284
Punta Alta,-38.88,-62.08,Argentina,57209
Saint Peters,38.7825,-90.6061,United States,57178
Arcoverde,-8.42,-37.07,Brazil,57163
Bragança,-1.05,-46.77,Brazil,57163
Taunton,41.9036,-71.0943,United States,57139
Al Mafraq,32.2833,36.2333,Jordan,57118
Puntarenas,9.9702,-84.8336,Costa Rica,57102
New Brunswick,40.487,-74.445,United States,57073
Mafetang,-29.8166,27.25,Lesotho,57059
General Pico,-35.6596,-63.77,Argentina,57029
Vaasa,63.1,21.6,Finland,57014
Roslavl,53.9509,32.8604,Russia,56971
Rodos,36.4412,28.2225,Greece,56969
Adrar,27.87,-0.29,Algeria,56910
Kitgum,3.3004,32.87,Uganda,56891
Cruzeiro do Sul,-7.63,-72.67,Brazil,56862
Los Andes,-32.8296,-70.6,Chile,56859
Serrinha,-11.6496,-39.01,Brazil,56829
Jijiga,9.3504,42.79,Ethiopia,56821
East Stroudsburg,41.0023,-75.1779,United States,56771
Vacaria,-28.4996,-50.94,Brazil,56765
Ridder,50.3554,83.5149,Kazakhstan,56756
Smyrna,33.8633,-84.5168,United States,56685
Tinley Park,41.567,-87.8051,United States,56668
Diamond Bar,33.9992,-117.8161,United States,56665
Eger,47.895,20.383,Hungary,56647
Puerto Barrios,15.7175,-88.5927,Guatemala,56605
Garzón,2.2104,-75.65,Colombia,56603
Tikrit,34.597,43.677,Iraq,56591
Janaúba,-15.7996,-43.31,Brazil,56572
Kaga Bandoro,6.9804,19.18,Central African Republic,56520
Bradenton,27.49,-82.5743,United States,56508
Magong,23.5667,119.5833,Taiwan,56435
Formiga,-20.46,-45.43,Brazil,56404
Alxa Zuoqi,38.839,105.6686,China,56387
Pol-e Khomri,35.9511,68.7011,Afghanistan,56369
Zouirat,22.7304,-12.4833,Mauritania,56345
Fountain Valley,33.7105,-117.9514,United States,56313
Pittsfield,42.4517,-73.2605,United States,56291
Richland,46.2826,-119.2938,United States,56243
Huntersville,35.4057,-80.873,United States,56212
Rotorua,-38.1317,176.2483,New Zealand,56200
Shoreline,47.7564,-122.3426,United States,56189
Hof,50.317,11.9167,Germany,56153
Paita,-5.09,-81.12,Peru,56151
Oak Lawn,41.7139,-87.7528,United States,56087
Nizhnyaya Tura,58.6436,59.7983,Russia,56084
Nova Viçosa,-17.88,-39.37,Brazil,55980
Novato,38.092,-122.5576,United States,55980
Bungoma,0.5704,34.56,Kenya,55962
Commerce City,39.8642,-104.8434,United States,55923
Lautoka,-17.6161,177.4666,Fiji,55894
Seres,41.086,23.5497,Greece,55886
Changling,44.27,123.99,China,55841
Hempstead,40.7043,-73.6193,United States,55806
Cartersville,34.1632,-84.8007,United States,55794
Itapipoca,-3.4995,-39.58,Brazil,55784
Ełk,53.8337,22.35,Poland,55769
Dearborn Heights,42.3164,-83.2769,United States,55758
Umm Ruwaba,12.9104,31.2,Sudan,55742
Kingston,41.9295,-73.9968,United States,55695
Parachinar,33.8992,70.1008,Pakistan,55685
Halmstad,56.6718,12.8556,Sweden,55657
Estância,-11.2696,-37.45,Brazil,55654
Sayanogorsk,53.0894,91.4004,Russia,55642
Évora,38.56,-7.906,Portugal,55620
Berwyn,41.8433,-87.7909,United States,55550
Arqalyq,50.2418,66.8976,Kazakhstan,55521
Chicopee,42.1764,-72.5719,United States,55515
Gelendzhik,44.5748,38.0644,Russia,55508
Vyazma,55.2122,34.2918,Russia,55500
Melo,-32.3595,-54.18,Uruguay,55494
Maldonado,-34.91,-54.96,Uruguay,55478
Brive,45.1504,1.5333,France,55448
Hazleton,40.9504,-75.9724,United States,55444
Ithaca,42.4442,-76.5032,United States,55439
São Gabriel,-30.32,-54.32,Brazil,55434
Xinqing,48.2363,129.5059,China,55415
Placetas,22.3158,-79.6555,Cuba,55408
Wagga Wagga,-35.1222,147.34,Australia,55381
Nakhon Phanom,17.3945,104.7695,Thailand,55377
Concórdia,-27.23,-52.03,Brazil,55367
Highland,34.1113,-117.1653,United States,55342
Lake Havasu City,34.5006,-114.3115,United States,55341
São José de Ribamar,-2.55,-44.07,Brazil,55265
Kribi,2.9404,9.91,Cameroon,55224
Kettering,39.6957,-84.1496,United States,55175
Euless,32.8508,-97.0798,United States,55174
Hoboken,40.7453,-74.0279,United States,55131
Abancay,-13.6396,-72.89,Peru,55111
Tadmur,34.5504,38.2833,Syria,55111
Kalasin,16.428,103.509,Thailand,55102
Marzuq,25.9044,13.8972,Libya,55071
Karlovac,45.4872,15.5478,Croatia,55063
Palm Beach Gardens,26.8488,-80.1656,United States,55036
Watertown,43.9734,-75.9094,United States,54980
Grants Pass,42.4333,-123.3317,United States,54973
Blue Springs,39.0124,-94.2722,United States,54945
Caicó,-6.4596,-37.1,Brazil,54934
Paramount,33.8976,-118.1651,United States,54909
Tarbes,43.2333,0.0833,France,54854
West Haven,41.2739,-72.9671,United States,54843
Colton,34.0538,-117.3254,United States,54828
Nuevo Casas Grandes,30.4185,-107.9119,Mexico,54826
Juigalpa,12.11,-85.38,Nicaragua,54731
Caldwell,43.6458,-116.6591,United States,54660
Ningan,44.3313,129.4659,China,54636
Fond du Lac,43.772,-88.4396,United States,54629
Arroyo Grande,35.1241,-120.5845,United States,54620
Cathedral City,33.8363,-116.4642,United States,54596
Cape Girardeau,37.3108,-89.5596,United States,54588
Rosemead,34.0688,-118.0823,United States,54554
El Banco,9.0003,-73.98,Colombia,54522
Moquegua,-17.19,-70.94,Peru,54517
Chivilcoy,-34.9,-60.04,Argentina,54514
Penápolis,-21.41,-50.08,Brazil,54477
Delano,35.767,-119.2637,United States,54471
Stonecrest,33.6843,-84.1373,United States,54471
Twin Falls,42.5645,-114.4611,United States,54455
Williamsport,41.2398,-77.0371,United States,54389
Ajaccio,41.9271,8.7283,France,54364
Krasnokamensk,50.0665,118.0265,Russia,54316
Mocambique,-15.0399,40.6822,Mozambique,54315
Eagle Pass,28.7118,-100.4832,United States,54299
Normal,40.522,-88.9877,United States,54284
Tacuarembó,-31.71,-55.98,Uruguay,54277
Ash Shihr,14.7593,49.6092,Yemen,54274
West New York,40.7856,-74.0093,United States,54227
Leesburg,39.1058,-77.5544,United States,54215
Beaufort,32.4487,-80.7103,United States,54207
Parker,39.5083,-104.7755,United States,54202
Aveiro,40.641,-8.651,Portugal,54162
Illichivsk,46.3,30.6666,Ukraine,54102
Southaven,34.9514,-89.9787,United States,54031
Nuevitas,21.5456,-77.2644,Cuba,54022
Brunswick,31.145,-81.474,United States,54017
Andorra,42.5,1.5165,Andorra,53998
Revere,42.4191,-71.0035,United States,53993
Grapevine,32.9343,-97.0744,United States,53982
Ruteng,-8.6118,120.4698,Indonesia,53976
Chiquinquirá,5.6204,-73.8199,Colombia,53975
Bozeman,45.6828,-111.0548,United States,53949
Azul,-36.7796,-59.87,Argentina,53941
Chicoutimi,48.4333,-71.0667,Canada,53940
Mount Prospect,42.0653,-87.937,United States,53930
Severomorsk,69.0731,33.4231,Russia,53921
Jihlava,49.4004,15.5833,Czechia,53921
Elyria,41.3761,-82.1063,United States,53883
Bijar,35.8741,47.5937,Iran,53871
Vyshnniy Volochek,57.583,34.5631,Russia,53800
Markala,13.6704,-6.07,Mali,53738
Bắc Giang,21.267,106.2,Vietnam,53728
Yevlax,40.6172,47.15,Azerbaijan,53716
San Pedro de las Colonias,25.7592,-102.9827,Mexico,53688
Upata,8.0204,-62.41,Venezuela,53685
Yucaipa,34.0336,-117.0426,United States,53683
Charikar,35.0183,69.1679,Afghanistan,53676
Pamplona,7.3904,-72.66,Colombia,53587
DeSoto,32.5992,-96.8633,United States,53568
Lenexa,38.9609,-94.8018,United States,53553
Brookhaven,33.8746,-84.3314,United States,53518
West Sacramento,38.5556,-121.5504,United States,53512
Buguruslan,53.663,52.433,Russia,53511
Ilo,-17.64,-71.34,Peru,53476
Lewiston,46.3935,-116.9934,United States,53436
Grand Island,40.9214,-98.3584,United States,53424
Bellevue,41.1535,-95.9357,United States,53424
Supham Buri,14.471,100.129,Thailand,53399
Río Tercero,-32.1796,-64.12,Argentina,53389
Joensuu,62.6,29.7666,Finland,53388
Wheaton,41.8561,-88.1083,United States,53373
Coari,-4.08,-63.13,Brazil,53305
Katerini,40.2723,22.5025,Greece,53293
Registro,-24.49,-47.84,Brazil,53273
St.-Brieuc,48.5167,-2.7833,France,53223
Taxco,18.5704,-99.62,Mexico,53217
Qingan,46.8719,127.5118,China,53206
Tingo María,-9.2896,-75.99,Peru,53177
Camaquã,-30.8396,-51.81,Brazil,53169
Tigard,45.4237,-122.7844,United States,53148
Turnovo,43.0862,25.6555,Bulgaria,53115
Banes,20.9629,-75.7186,Cuba,53104
Minnetonka,44.9332,-93.4617,United States,53085
Peabody,42.5335,-70.9724,United States,52987
Alexandroupoli,40.8486,25.8744,Greece,52979
City of Milford (balance),41.2253,-73.0624,United States,52970
Mercedes,-34.66,-59.44,Argentina,52949
Arrecife,28.969,-13.5378,Spain,52944
Crateús,-5.1656,-40.666,Brazil,52933
Palm Desert,33.7378,-116.3695,United States,52932
Livny,52.4248,37.6044,Russia,52915
Lompoc,34.6618,-120.4714,United States,52856
Pinellas Park,27.8588,-82.7076,United States,52854
Perth Amboy,40.5203,-74.2724,United States,52823
Port Shepstone,-30.7195,30.46,South Africa,52793
Lorica,9.2419,-75.816,Colombia,52771
Slobozia,44.57,27.382,Romania,52693
Krasnokamsk,58.0747,55.7443,Russia,52689
Siena,43.317,11.35,Italy,52625
Farmington,36.7555,-108.1823,United States,52555
Mongu,-15.2796,23.12,Zambia,52534
Puerto Ayacucho,5.6639,-67.6236,Venezuela,52526
Porirua,-41.1219,174.8524,New Zealand,52500
New Plymouth,-39.0556,174.0748,New Zealand,52500
Thongwa,16.7547,96.5193,Burma,52496
Jaén,-5.7096,-78.81,Peru,52493
Pursat,12.5337,103.9167,Cambodia,52476
Bundaberg,-24.8791,152.3509,Australia,52472
Glendora,34.1449,-117.8468,United States,52445
Tromsø,69.6351,18.992,Norway,52436
Apple Valley,44.7458,-93.2006,United States,52435
Mérida,38.912,-6.338,Spain,52423
Chambersburg,39.9315,-77.6556,United States,52418
Andradina,-20.9096,-51.3799,Brazil,52406
Barra do Garças,-15.8796,-52.26,Brazil,52398
Fredericton,45.95,-66.6333,Canada,52337
Hamilton,32.2942,-64.7839,Bermuda,52320
Naryn,41.4263,75.9911,Kyrgyzstan,52300
Oak Park,41.8872,-87.7899,United States,52261
Basankusu,1.2337,19.8,Congo (Kinshasa),52216
Whangarei,-35.7256,174.323,New Zealand,52200
Tayshet,55.9277,97.9877,Russia,52184
Placentia,33.8807,-117.8553,United States,52157
Nyagan,62.1465,65.3814,Russia,52137
Kimry,56.8691,37.3444,Russia,52070
Walvis Bay,-22.9575,14.5053,Namibia,52058
Batatais,-20.89,-47.59,Brazil,51976
Edina,44.8914,-93.3602,United States,51958
Chilliwack,49.1666,-121.95,Canada,51942
Usulután,13.346,-88.432,El Salvador,51910
Gwadar,25.139,62.3286,Pakistan,51901
Kentwood,42.8852,-85.5925,United States,51747
Burien,47.4762,-122.3393,United States,51671
Aliso Viejo,33.5792,-117.729,United States,51671
Maha Sarakham,16.184,103.298,Thailand,51584
Sierra Vista,31.563,-110.3153,United States,51571
Hoffman Estates,42.0638,-88.1463,United States,51567
Apopka,28.7015,-81.5308,United States,51564
Tucupita,9.0605,-62.06,Venezuela,51534
Emden,53.3667,7.2167,Germany,51526
Itacoatiara,-3.14,-58.44,Brazil,51509
Florissant,38.7996,-90.3269,United States,51443
Tefé,-3.36,-64.7,Brazil,51437
Jendouba,36.5,8.75,Tunisia,51408
Bloomsburg,41.0027,-76.4561,United States,51356
Tarma,-11.41,-75.73,Peru,51350
Tulun,54.5653,100.5654,Russia,51330
Plainfield,40.6154,-74.4157,United States,51327
Saint Cloud,28.2303,-81.2849,United States,51282
Vejle,55.709,9.535,Denmark,51177
Séguéla,7.9504,-6.67,Côte D’Ivoire,51157
Coral Gables,25.7037,-80.2715,United States,51095
Nyeri,-0.417,36.951,Kenya,51084
Jinotega,13.091,-86,Nicaragua,51073
Kyustendil,42.2843,22.6911,Bulgaria,51067
Cerritos,33.8677,-118.0686,United States,51020
Hinesville,31.8247,-81.6135,United States,51001
Kyshtym,55.7,60.5595,Russia,50911
Ye,15.2533,97.8679,Burma,50798
Campobasso,41.563,14.656,Italy,50762
Mahalapye,-23.1,26.82,Botswana,50744
Jutiapa,14.29,-89.9,Guatemala,50681
Mweka,-4.8396,21.57,Congo (Kinshasa),50675
Phetchabun,16.419,101.159,Thailand,50656
New Bern,35.0955,-77.0724,United States,50617
Xanthi,41.1418,24.8836,Greece,50570
Passau,48.567,13.4666,Germany,50560
Turbo,8.1004,-76.74,Colombia,50508
Gbadolite,4.2904,21.0199,Congo (Kinshasa),50493
Hua Hin,12.5697,99.9443,Thailand,50456
Apex,35.7248,-78.8659,United States,50451
Araguaína,-7.19,-48.21,Brazil,50444
Arjona,10.26,-75.35,Colombia,50405
Summerville,33.0005,-80.1788,United States,50388
Sawahlunto,-0.6663,100.7833,Indonesia,50354
Trujillo,9.3804,-70.44,Venezuela,50353
Ma'an,30.192,35.736,Jordan,50350
Sisophon,13.5838,102.9833,Cambodia,50302
Collierville,35.0474,-89.699,United States,50286
Methuen,42.734,-71.1889,United States,50259
Lakewood,41.4824,-81.8008,United States,50249
Helena,46.5964,-112.0197,United States,50227
Ferreñafe,-6.63,-79.8,Peru,50184
Ad Nabk,34.017,36.7333,Syria,50178
North Bay,46.3,-79.45,Canada,50170
Siguiri,11.4171,-9.1666,Guinea,50159
Otradnyy,53.3778,51.3474,Russia,50127
Kampot,10.6171,104.1833,Cambodia,50105
Gogrial,8.5337,28.1167,South Sudan,50065
Poway,32.9871,-117.0201,United States,50041
Pa-an,16.85,97.6167,Burma,50000
Puzi,23.4611,120.2419,Taiwan,50000
Korogwe,-5.0896,38.54,Tanzania,50000
Kahemba,-7.2829,19,Congo (Kinshasa),50000
Bairin Zuoqi,43.9837,119.1834,China,50000`;

type City = {
  name: string;
  lat: number;
  lng: number;
  country: string;
  population: number;
}

const getCities = (): City[] => {
  const cities = citiesCSV.split("\n").slice(1);
  return cities.map((city) => {
    const [cityName, lat, lng, country, population] = city.split(",");
    return {
      name: cityName,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      country,
      population: parseInt(population),
    };
  });
}

const cities = getCities();

export default cities;