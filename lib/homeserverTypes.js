// ID	Datenformat
// 1	1 Bit
// 2	8 Bit (0..100)
// 3	8 Bit (RTR)
// 4	16 Bit (Gleitkomma)
// 5	2 Bit
// 9	4 Byte
// 10	8 Bit (unsigned) oder Dali
// 11	8 Bit (signed)
// 12	16 Bit (unsigned)
// 13	16 Bit (signed)
// 14	32 Bit (unsigned) oder Sammelrückmeldeobjekt
// 15	32 Bit (signed)
// 16	4 Bit
// 17	3 Byte
// 20	3 Byte (Zeit)
// 21	3 Byte (Datum)
// 22	14 Byte (String)
`use strict`;

/**
 * TODO Erweitern der speziellen Datentypen von KNX
 * Bisher sind nur die boolean, numerischen und String-Datentypen eingebunden.
 */

function getTypeOfGiraDatapoint(format){
	switch (format) {
		case 1: return "boolean";
		case 2: return "number";
		case 4: return "number";
		case 9: return "number";
		case 11: return "number";
		case 12: return "number";
		case 13: return "number";
		case 14: return "number";
		case 15: return "number";
		case 22: return "string";
		default: return "Mixed";
	}
}

/**
 * TODO Tests für Funktionen erstellen
 * bisher ist noch kein Test für mocha eingebunden
 */

module.exports = {
	getTypeOfGiraDatapoint : getTypeOfGiraDatapoint
};