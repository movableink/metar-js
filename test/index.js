var metar = require('../');

var umms = metar.parseMetar('METAR UMMS 081400Z 26002MPS 220V300 9999 -RA OVC030 07/06 Q1013 R31/290060 NOSIG');
var ummm = metar.parseMetar('METAR UMMM 081400Z 26003MPS 6000 -SHRA BKN018CB OVC100 07/06 Q1012 R30/290050 NOSIG RMK QFE740');
var ummg = metar.parseMetar('METAR UMMG 081300Z 00000MPS 8000 -SHRA BKN030CB OVC066 08/07 Q1012 R17/CLRD// NOSIG');
var uuee = metar.parseMetar('UUEE 081400Z 21003MPS CAVOK 05/03 Q1011 75000062 25000062 NOSIG');
var uuww = metar.parseMetar('UUWW 081400Z 19003MPS CAVOK 05/02 Q1012 19000070 NOSIG');
var uudd = metar.parseMetar('UUDD 081400Z 25002MPS 220V300 CAVOK 05/02 Q1012 32010095 82010095 NOSIG');
var egll1 = metar.parseMetar('EGLL 101350Z AUTO 27012KT 9999 SCT029/// SCT044/// //////CB 11/06 Q1006 NOSIG');
var egll2 = metar.parseMetar('EGLL 101250Z AUTO 28009KT 9999 FEW024 11/07 Q1006 NOSIG');
var ksaw = metar.parseMetar('KSAW 110145Z 33013KT 10SM SKC 10/03 A2987');
var cylw = metar.parseMetar('CYLW 110252Z AUTO VRB02KT 6SM BR CLR 05/04 A3015 RMK SLP222');
var k2v5 = metar.parseMetar('K2V5 122155Z AUTO 19013G19KT 10SM OVC002 20/M02 A3011 RMK AO2');

exports.testMessageTypeParsing = function(test) {
  test.equal(umms.type, 'METAR');
  test.equal(ummm.type, 'METAR');
  test.equal(ummg.type, 'METAR');
  test.equal(uuee.type, 'METAR');
  test.equal(uuww.type, 'METAR');
  test.equal(uudd.type, 'METAR');
  test.equal(egll1.type, 'METAR');
  test.equal(egll2.type, 'METAR');
  test.equal(ksaw.type, 'METAR');
  test.equal(cylw.type, 'METAR');
  test.equal(k2v5.type, 'METAR');
  test.done();
};

exports.testAirportCodeParsing = function(test) {
  test.equal(umms.airport, 'UMMS');
  test.equal(ummm.airport, 'UMMM');
  test.equal(ummg.airport, 'UMMG');
  test.equal(uuee.airport, 'UUEE');
  test.equal(uuww.airport, 'UUWW');
  test.equal(uudd.airport, 'UUDD');
  test.equal(egll1.airport, 'EGLL');
  test.equal(egll2.airport, 'EGLL');
  test.equal(ksaw.airport, 'KSAW');
  test.equal(cylw.airport, 'CYLW');
  test.equal(k2v5.airport, 'K2V5');
  test.done();
};

exports.testTimestampParsing = function(test) {
  test.equal(umms.day, 8);
  test.equal(umms.hour, 14);
  test.equal(umms.min, 0);

  test.equal(ummg.day, 8);
  test.equal(ummg.hour, 13);
  test.equal(umms.min, 0);

  test.done();
};

exports.testWindParsing = function(test) {
  test.equal(umms.wind.speed, 2);
  test.equal(umms.wind.course, 260);
  test.equal(umms.wind.measure, 'MPS');
  test.equal(umms.wind.deviation.from, 220);
  test.equal(umms.wind.deviation.to, 300);

  test.equal(uuee.wind.speed, 3);
  test.equal(uuee.wind.course, 210);
  test.equal(uuee.wind.measure, 'MPS');

  test.equal(uudd.wind.speed, 2);
  test.equal(uudd.wind.course, 250);
  test.equal(uudd.wind.measure, 'MPS');

  test.equal(egll1.wind.speed, 12);
  test.equal(egll1.wind.course, 270);
  test.equal(egll1.wind.measure, 'KT');

  test.equal(egll2.wind.speed, 9);
  test.equal(egll2.wind.course, 280);
  test.equal(egll2.wind.measure, 'KT');

  test.done();
};

exports.testVisibilityParsing = function(test) {
  test.equal(umms.visibility, 9999);
  test.equal(ummm.visibility, 6000);
  test.equal(ummg.visibility, 8000);
  test.equal(uuee.visibility, 'CAVOK');
  test.equal(uuww.visibility, 'CAVOK');
  test.equal(uudd.visibility, 'CAVOK');
  test.equal(egll1.visibility, 9999);
  test.equal(egll2.visibility, 9999);

  test.done();
};

exports.testWeatherParsing = function(test) {
  test.equal(umms.weather.length, 1);
  test.equal(umms.weather[0].intensity, '-');
  test.equal(umms.weather[0].descriptor, undefined);
  test.equal(umms.weather[0].condition, 'RA');

  test.equal(ummm.weather.length, 1);
  test.equal(ummm.weather[0].intensity, '-');
  test.equal(ummm.weather[0].descriptor, 'SH');
  test.equal(ummm.weather[0].condition, 'RA');

  test.equal(ummg.weather.length, 1);
  test.equal(ummg.weather[0].intensity, '-');
  test.equal(ummg.weather[0].descriptor, 'SH');
  test.equal(ummg.weather[0].condition, 'RA');

  test.equal(uuee.weather, undefined);
  test.equal(uuww.weather, undefined);
  test.equal(uudd.weather, undefined);

  test.equal(cylw.weather.length, 1);
  test.equal(cylw.weather[0].condition, 'BR');

  test.done();
};

exports.testCloudsParsing = function(test) {
  test.equal(umms.clouds.length, 1);
  test.equal(umms.clouds[0].code, 'OVC');
  test.equal(umms.clouds[0].base, 30);

  test.equal(ummm.clouds.length, 2);
  test.equal(ummm.clouds[0].code, 'BKN');
  test.equal(ummm.clouds[0].base, 18);
  test.equal(ummm.clouds[0].descriptor, 'CB');
  test.equal(ummm.clouds[1].code, 'OVC');
  test.equal(ummm.clouds[1].base, 100);

  test.equal(ummg.clouds.length, 2);
  test.equal(ummg.clouds[0].code, 'BKN');
  test.equal(ummg.clouds[0].base, 30);
  test.equal(ummg.clouds[0].descriptor, 'CB');
  test.equal(ummg.clouds[1].code, 'OVC');
  test.equal(ummg.clouds[1].base, 66);

  test.equal(uuee.clouds, undefined);
  test.equal(uuww.clouds, undefined);
  test.equal(uudd.clouds, undefined);

  test.equal(egll1.clouds.length, 2);
  test.equal(egll1.clouds[0].code, 'SCT');
  test.equal(egll1.clouds[0].base, 29);
  test.equal(egll1.clouds[1].code, 'SCT');
  test.equal(egll1.clouds[1].base, 44);

  test.equal(egll2.clouds.length, 1);
  test.equal(egll2.clouds[0].code, 'FEW');
  test.equal(egll2.clouds[0].base, 24);

  test.equal(ksaw.clouds.length, 1);
  test.equal(ksaw.clouds[0].code, 'SKC');

  test.equal(cylw.clouds.length, 1);
  test.equal(cylw.clouds[0].code, 'CLR');

  test.done();
};

exports.testTemperatureParsing = function(test) {
  test.equal(umms.temperature, 7);
  test.equal(umms.dewPoint, 6);

  test.equal(ummm.temperature, 7);
  test.equal(ummm.dewPoint, 6);

  test.equal(ummg.temperature, 8);
  test.equal(ummg.dewPoint, 7);

  test.equal(uuee.temperature, 5);
  test.equal(uuee.dewPoint, 3);

  test.equal(uuww.temperature, 5);
  test.equal(uuww.dewPoint, 2);

  test.equal(uudd.temperature, 5);
  test.equal(uudd.dewPoint, 2);

  test.equal(egll1.temperature, 11);
  test.equal(egll1.dewPoint, 6);

  test.equal(egll2.temperature, 11);
  test.equal(egll2.dewPoint, 7);

  test.done();
};

exports.testQNHParsing = function(test) {
  test.equal(umms.qnh, 1013);
  test.equal(ummm.qnh, 1012);
  test.equal(ummg.qnh, 1012);
  test.equal(uuee.qnh, 1011);
  test.equal(uuww.qnh, 1012);
  test.equal(uudd.qnh, 1012);
  test.equal(egll1.qnh, 1006);
  test.equal(egll2.qnh, 1006);

  test.done();
};

exports.testRVRParsing = function(test) {
  test.equal(umms.rvr.length, 1);
  test.equal(umms.rvr[0].rwy, '31');
  test.equal(umms.rvr[0].visibility, 2900);

  test.equal(ummm.rvr.length, 1);
  test.equal(ummm.rvr[0].rwy, '30');
  test.equal(ummm.rvr[0].visibility, 2900);

  test.done();
};

exports.testRwyConditionsParsing = function(test) {
  test.equal(uuee.rwyConditions.length, 2);
  test.equal(uuee.rwyConditions[0].rwy, '25R');
  test.equal(uuee.rwyConditions[0].state, 0);
  test.equal(uuee.rwyConditions[0].coverage, 0);
  test.equal(uuee.rwyConditions[0].depth, 0);
  test.equal(uuee.rwyConditions[0].frictionCoefficient, 0.62);
  test.equal(uuee.rwyConditions[1].rwy, '25');
  test.equal(uuee.rwyConditions[1].state, 0);
  test.equal(uuee.rwyConditions[1].coverage, 0);
  test.equal(uuee.rwyConditions[1].depth, 0);
  test.equal(uuee.rwyConditions[1].frictionCoefficient, 0.62);

  test.equal(uuww.rwyConditions.length, 1);
  test.equal(uuww.rwyConditions[0].rwy, '19');
  test.equal(uuww.rwyConditions[0].state, 0);
  test.equal(uuww.rwyConditions[0].coverage, 0);
  test.equal(uuww.rwyConditions[0].depth, 0);
  test.equal(uuww.rwyConditions[0].frictionCoefficient, 0.70);

  test.equal(uudd.rwyConditions.length, 2);
  test.equal(uudd.rwyConditions[0].rwy, '32');
  test.equal(uudd.rwyConditions[0].state, 0);
  test.equal(uudd.rwyConditions[0].coverage, 1);
  test.equal(uudd.rwyConditions[0].depth, 0);
  test.equal(uudd.rwyConditions[0].frictionCoefficient, 0.95);
  test.equal(uudd.rwyConditions[1].rwy, '32R');
  test.equal(uudd.rwyConditions[1].state, 0);
  test.equal(uudd.rwyConditions[1].coverage, 1);
  test.equal(uudd.rwyConditions[1].depth, 0);
  test.equal(uudd.rwyConditions[1].frictionCoefficient, 0.95);

  test.done();
};

exports.testQFEParsing = function(test) {
  test.equal(ummm.qfe, 986);
  test.done();
};

exports.testForecastParsing = function(test) {
  test.equal(umms.forecast, 'NOSIG');
  test.equal(ummm.forecast, 'NOSIG');
  test.equal(ummg.forecast, 'NOSIG');
  test.equal(uuee.forecast, 'NOSIG');
  test.equal(uuww.forecast, 'NOSIG');
  test.equal(uudd.forecast, 'NOSIG');
  test.equal(egll1.forecast, 'NOSIG');
  test.equal(egll2.forecast, 'NOSIG');
  test.done();
};

exports.testModifierParsing = function(test) {
  var obj = metar.parseMetar('CWRJ 091900Z AUTO 24009KT 00/M04 RMK AO1 SLP226 T00001042 58002');
  test.equal(obj.modifier, 'AUTO');
  test.done();
};
