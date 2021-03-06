export const user_fake_data = ({ page, pageSize, sessionID }) => {
    let userInSession = fake_data.filter((user) => user.sessionID === sessionID);
    let totalUsers = userInSession.length;
    let totalPages = Math.ceil(totalUsers / pageSize);
    if (page + 1 > totalPages) return { users: [], totalUsers: totalUsers };

    const dataResponse = userInSession.slice(page * pageSize, (page + 1) * pageSize);
    return { users: dataResponse, totalUsers: totalUsers };
}


const fake_data = JSON.parse(
    `
[{  "id": 1,
  "sessionID": 4,
  "code": "0025-1041",
  "name": "Chilton Maccaig",
  "score": 89,
  "time": "1:26:55 AM"
}, {
  "id": 2,
  "sessionID": 2,
  "code": "64942-1272",
  "name": "Adorne Hawarden",
  "score": 60,
  "time": "4:22:02 AM"
}, {
  "id": 3,
  "sessionID": 3,
  "code": "68084-359",
  "name": "Serena Danbi",
  "score": 12,
  "time": "5:26:50 PM"
}, {
  "id": 4,
  "sessionID": 5,
  "code": "62382-0322",
  "name": "Ninon Jeffcock",
  "score": 20,
  "time": "10:32:26 PM"
}, {
  "id": 5,
  "sessionID": 1,
  "code": "0591-3768",
  "name": "Yoko Ebunoluwa",
  "score": 92,
  "time": "10:14:30 AM"
}, {
  "id": 6,
  "sessionID": 5,
  "code": "36987-2800",
  "name": "Shea Collet",
  "score": 90,
  "time": "9:31:56 AM"
}, {
  "id": 7,
  "sessionID": 2,
  "code": "33261-390",
  "name": "Jonathan Meth",
  "score": 18,
  "time": "8:59:39 PM"
}, {
  "id": 8,
  "sessionID": 2,
  "code": "52125-427",
  "name": "Raye Dougharty",
  "score": 1,
  "time": "9:21:06 PM"
}, {
  "id": 9,
  "sessionID": 2,
  "code": "0781-3129",
  "name": "Olympia Towndrow",
  "score": 16,
  "time": "9:21:11 AM"
}, {
  "id": 10,
  "sessionID": 2,
  "code": "0781-2226",
  "name": "Kathryne Plait",
  "score": 34,
  "time": "12:55:56 PM"
}, {
  "id": 11,
  "sessionID": 2,
  "code": "47593-262",
  "name": "Georgeanna Kenrack",
  "score": 72,
  "time": "6:10:36 PM"
}, {
  "id": 12,
  "sessionID": 4,
  "code": "16590-596",
  "name": "Nathanial Abramchik",
  "score": 93,
  "time": "7:08:39 PM"
}, {
  "id": 13,
  "sessionID": 5,
  "code": "0009-0085",
  "name": "Karita Letchford",
  "score": 68,
  "time": "2:18:27 PM"
}, {
  "id": 14,
  "sessionID": 4,
  "code": "11410-923",
  "name": "Janina Surgey",
  "score": 90,
  "time": "11:08:10 PM"
}, {
  "id": 15,
  "sessionID": 4,
  "code": "36800-807",
  "name": "Ronny Castlake",
  "score": 70,
  "time": "11:30:16 AM"
}, {
  "id": 16,
  "sessionID": 1,
  "code": "0363-0244",
  "name": "Derry Peckham",
  "score": 81,
  "time": "12:47:49 PM"
}, {
  "id": 17,
  "sessionID": 5,
  "code": "12634-698",
  "name": "Celine Jent",
  "score": 99,
  "time": "5:45:27 AM"
}, {
  "id": 18,
  "sessionID": 5,
  "code": "24658-213",
  "name": "Saloma Longhorne",
  "score": 58,
  "time": "2:13:28 PM"
}, {
  "id": 19,
  "sessionID": 5,
  "code": "0781-3169",
  "name": "Reinhard Dubble",
  "score": 44,
  "time": "3:43:59 AM"
}, {
  "id": 20,
  "sessionID": 3,
  "code": "58666-3121",
  "name": "Reiko Palatino",
  "score": 44,
  "time": "4:16:41 AM"
}, {
  "id": 21,
  "sessionID": 4,
  "code": "42002-106",
  "name": "Tobie Aime",
  "score": 64,
  "time": "9:34:14 PM"
}, {
  "id": 22,
  "sessionID": 2,
  "code": "55910-038",
  "name": "Cristian Tatham",
  "score": 21,
  "time": "11:12:00 PM"
}, {
  "id": 23,
  "sessionID": 1,
  "code": "54162-555",
  "name": "Ema Whaplington",
  "score": 18,
  "time": "4:17:39 PM"
}, {
  "id": 24,
  "sessionID": 2,
  "code": "63843-547",
  "name": "Simona Murley",
  "score": 3,
  "time": "1:47:43 AM"
}, {
  "id": 25,
  "sessionID": 3,
  "code": "36987-1716",
  "name": "Barbara-anne Henrichsen",
  "score": 20,
  "time": "7:43:38 AM"
}, {
  "id": 26,
  "sessionID": 1,
  "code": "25021-134",
  "name": "Anallese Limeburn",
  "score": 19,
  "time": "1:11:07 PM"
}, {
  "id": 27,
  "sessionID": 5,
  "code": "52584-771",
  "name": "Luce Estevez",
  "score": 16,
  "time": "9:00:45 AM"
}, {
  "id": 28,
  "sessionID": 3,
  "code": "55111-663",
  "name": "Raphael Matisse",
  "score": 65,
  "time": "1:33:18 AM"
}, {
  "id": 29,
  "sessionID": 1,
  "code": "54868-3781",
  "name": "Berna Seldner",
  "score": 67,
  "time": "9:11:03 AM"
}, {
  "id": 30,
  "sessionID": 1,
  "code": "0039-0222",
  "name": "Debbie Bumpas",
  "score": 73,
  "time": "3:33:46 AM"
}, {
  "id": 31,
  "sessionID": 4,
  "code": "13925-100",
  "name": "Win Albery",
  "score": 44,
  "time": "11:58:38 PM"
}, {
  "id": 32,
  "sessionID": 4,
  "code": "50242-076",
  "name": "Montague Edington",
  "score": 94,
  "time": "5:45:34 PM"
}, {
  "id": 33,
  "sessionID": 4,
  "code": "0245-0271",
  "name": "Linnea Maytom",
  "score": 57,
  "time": "7:59:58 AM"
}, {
  "id": 34,
  "sessionID": 4,
  "code": "55714-2329",
  "name": "Laurent Yarrington",
  "score": 37,
  "time": "5:10:29 PM"
}, {
  "id": 35,
  "sessionID": 5,
  "code": "59535-4511",
  "name": "Alix Allitt",
  "score": 52,
  "time": "1:57:39 PM"
}, {
  "id": 36,
  "sessionID": 2,
  "code": "42023-119",
  "name": "Ariela Bellison",
  "score": 68,
  "time": "1:51:44 AM"
}, {
  "id": 37,
  "sessionID": 3,
  "code": "54868-0065",
  "name": "Hoebart Mold",
  "score": 74,
  "time": "6:23:01 PM"
}, {
  "id": 38,
  "sessionID": 1,
  "code": "0781-5790",
  "name": "Blanca Ajam",
  "score": 92,
  "time": "9:20:52 PM"
}, {
  "id": 39,
  "sessionID": 3,
  "code": "54458-967",
  "name": "Eleanore Braunds",
  "score": 32,
  "time": "12:16:44 AM"
}, {
  "id": 40,
  "sessionID": 5,
  "code": "21695-748",
  "name": "Melisent Phant",
  "score": 4,
  "time": "7:23:52 AM"
}, {
  "id": 41,
  "sessionID": 3,
  "code": "49808-123",
  "name": "Gerrie Kubacek",
  "score": 27,
  "time": "1:54:32 AM"
}, {
  "id": 42,
  "sessionID": 3,
  "code": "0378-2695",
  "name": "Paloma Powys",
  "score": 23,
  "time": "6:36:14 AM"
}, {
  "id": 43,
  "sessionID": 2,
  "code": "49999-024",
  "name": "Rudyard Wakerley",
  "score": 76,
  "time": "7:18:40 AM"
}, {
  "id": 44,
  "sessionID": 5,
  "code": "52125-039",
  "name": "Ingar Spary",
  "score": 1,
  "time": "10:41:33 PM"
}, {
  "id": 45,
  "sessionID": 3,
  "code": "65954-772",
  "name": "Veriee Bodley",
  "score": 87,
  "time": "9:46:59 PM"
}, {
  "id": 46,
  "sessionID": 5,
  "code": "43353-920",
  "name": "Toni Blasetti",
  "score": 47,
  "time": "4:48:33 PM"
}, {
  "id": 47,
  "sessionID": 3,
  "code": "29333-0001",
  "name": "Luciano Peach",
  "score": 38,
  "time": "7:30:40 PM"
}, {
  "id": 48,
  "sessionID": 4,
  "code": "51824-021",
  "name": "Kaela Pinsent",
  "score": 31,
  "time": "2:41:30 PM"
}, {
  "id": 49,
  "sessionID": 2,
  "code": "41250-335",
  "name": "Debby Battams",
  "score": 41,
  "time": "9:06:25 AM"
}, {
  "id": 50,
  "sessionID": 5,
  "code": "53499-5803",
  "name": "Barnett Lockhead",
  "score": 45,
  "time": "4:00:24 AM"
}, {
  "id": 51,
  "sessionID": 3,
  "code": "68745-1046",
  "name": "Tiphany Rashleigh",
  "score": 42,
  "time": "9:08:19 AM"
}, {
  "id": 52,
  "sessionID": 5,
  "code": "59779-871",
  "name": "Shandeigh Southcombe",
  "score": 46,
  "time": "1:28:57 PM"
}, {
  "id": 53,
  "sessionID": 4,
  "code": "36987-3260",
  "name": "Allis Mathan",
  "score": 63,
  "time": "1:04:21 PM"
}, {
  "id": 54,
  "sessionID": 1,
  "code": "0178-8250",
  "name": "Ladonna Jennemann",
  "score": 15,
  "time": "2:11:56 PM"
}, {
  "id": 55,
  "sessionID": 5,
  "code": "36987-1260",
  "name": "Kakalina Haylock",
  "score": 8,
  "time": "9:56:19 AM"
}, {
  "id": 56,
  "sessionID": 2,
  "code": "51672-4143",
  "name": "Pren Willavoys",
  "score": 76,
  "time": "5:20:06 AM"
}, {
  "id": 57,
  "sessionID": 4,
  "code": "0378-3123",
  "name": "Fanchette Yarwood",
  "score": 47,
  "time": "6:54:50 PM"
}, {
  "id": 58,
  "sessionID": 2,
  "code": "17478-808",
  "name": "Brandi Butler-Bowdon",
  "score": 70,
  "time": "8:04:10 PM"
}, {
  "id": 59,
  "sessionID": 2,
  "code": "51079-991",
  "name": "Kiersten Lidyard",
  "score": 84,
  "time": "4:53:42 PM"
}, {
  "id": 60,
  "sessionID": 5,
  "code": "68462-332",
  "name": "Maressa Murrock",
  "score": 47,
  "time": "1:30:16 AM"
}, {
  "id": 61,
  "sessionID": 1,
  "code": "52685-344",
  "name": "Hilarius Mawditt",
  "score": 8,
  "time": "11:51:36 PM"
}, {
  "id": 62,
  "sessionID": 2,
  "code": "49288-0647",
  "name": "Sari Slot",
  "score": 30,
  "time": "12:37:50 PM"
}, {
  "id": 63,
  "sessionID": 5,
  "code": "55289-768",
  "name": "Jessalin Guiraud",
  "score": 0,
  "time": "6:25:10 AM"
}, {
  "id": 64,
  "sessionID": 1,
  "code": "48951-4100",
  "name": "Maximilian Boissier",
  "score": 1,
  "time": "5:09:02 AM"
}, {
  "id": 65,
  "sessionID": 2,
  "code": "42549-612",
  "name": "Bird Macknish",
  "score": 37,
  "time": "12:59:49 PM"
}, {
  "id": 66,
  "sessionID": 4,
  "code": "52125-711",
  "name": "Othilie Snooks",
  "score": 98,
  "time": "2:20:19 PM"
}, {
  "id": 67,
  "sessionID": 5,
  "code": "0615-2303",
  "name": "Karna Braffington",
  "score": 58,
  "time": "8:35:16 AM"
}, {
  "id": 68,
  "sessionID": 2,
  "code": "54868-5990",
  "name": "Connie Isaq",
  "score": 99,
  "time": "10:56:09 PM"
}, {
  "id": 69,
  "sessionID": 3,
  "code": "49580-0345",
  "name": "Tabby Caldwall",
  "score": 100,
  "time": "12:06:04 PM"
}, {
  "id": 70,
  "sessionID": 3,
  "code": "53304-0301",
  "name": "Felipa Bindin",
  "score": 72,
  "time": "11:52:52 PM"
}, {
  "id": 71,
  "sessionID": 2,
  "code": "33261-550",
  "name": "Jerome Moakson",
  "score": 56,
  "time": "10:03:07 PM"
}, {
  "id": 72,
  "sessionID": 2,
  "code": "63629-4487",
  "name": "Shelia Hryncewicz",
  "score": 28,
  "time": "6:00:16 PM"
}, {
  "id": 73,
  "sessionID": 2,
  "code": "36987-1659",
  "name": "Jermaine Guitonneau",
  "score": 39,
  "time": "11:42:21 AM"
}, {
  "id": 74,
  "sessionID": 5,
  "code": "50458-309",
  "name": "Estell Vale",
  "score": 46,
  "time": "7:53:30 PM"
}, {
  "id": 75,
  "sessionID": 1,
  "code": "54868-6274",
  "name": "Eustace Adamowicz",
  "score": 39,
  "time": "6:40:14 AM"
}, {
  "id": 76,
  "sessionID": 5,
  "code": "59417-103",
  "name": "Joye Freiberg",
  "score": 38,
  "time": "9:17:09 AM"
}, {
  "id": 77,
  "sessionID": 5,
  "code": "49288-0645",
  "name": "Binky Sowray",
  "score": 20,
  "time": "1:27:12 PM"
}, {
  "id": 78,
  "sessionID": 4,
  "code": "0555-0859",
  "name": "Merry Petrushkevich",
  "score": 57,
  "time": "9:28:48 AM"
}, {
  "id": 79,
  "sessionID": 5,
  "code": "42507-489",
  "name": "Ruby Barnby",
  "score": 73,
  "time": "8:05:40 PM"
}, {
  "id": 80,
  "sessionID": 1,
  "code": "11822-5311",
  "name": "Slade Gibbieson",
  "score": 73,
  "time": "2:34:56 AM"
}, {
  "id": 81,
  "sessionID": 1,
  "code": "49730-112",
  "name": "Jeramie Synder",
  "score": 85,
  "time": "12:40:33 AM"
}, {
  "id": 82,
  "sessionID": 2,
  "code": "49288-0350",
  "name": "Thurstan MacAlpine",
  "score": 37,
  "time": "3:52:12 AM"
}, {
  "id": 83,
  "sessionID": 3,
  "code": "55154-5093",
  "name": "Sibyl McCreery",
  "score": 93,
  "time": "8:14:08 AM"
}, {
  "id": 84,
  "sessionID": 4,
  "code": "52959-984",
  "name": "Gabriel Corbridge",
  "score": 82,
  "time": "12:10:30 AM"
}, {
  "id": 85,
  "sessionID": 4,
  "code": "50458-593",
  "name": "Faunie Revitt",
  "score": 4,
  "time": "11:57:43 PM"
}, {
  "id": 86,
  "sessionID": 5,
  "code": "0093-0132",
  "name": "Cinnamon Oxer",
  "score": 8,
  "time": "12:12:37 AM"
}, {
  "id": 87,
  "sessionID": 5,
  "code": "50268-815",
  "name": "Roxana Meffen",
  "score": 20,
  "time": "8:58:36 AM"
}, {
  "id": 88,
  "sessionID": 4,
  "code": "63187-111",
  "name": "Stillman Clay",
  "score": 39,
  "time": "9:21:03 PM"
}, {
  "id": 89,
  "sessionID": 5,
  "code": "16729-079",
  "name": "Cross Tucknott",
  "score": 17,
  "time": "12:39:40 PM"
}, {
  "id": 90,
  "sessionID": 2,
  "code": "37000-006",
  "name": "Myrah Coppard",
  "score": 54,
  "time": "1:40:30 AM"
}, {
  "id": 91,
  "sessionID": 4,
  "code": "55513-006",
  "name": "Rouvin MacDowall",
  "score": 20,
  "time": "4:22:01 PM"
}, {
  "id": 92,
  "sessionID": 5,
  "code": "0378-3613",
  "name": "Elbertina Santacrole",
  "score": 34,
  "time": "1:53:51 AM"
}, {
  "id": 93,
  "sessionID": 2,
  "code": "49348-500",
  "name": "Cyndi Bendell",
  "score": 14,
  "time": "7:44:23 PM"
}, {
  "id": 94,
  "sessionID": 5,
  "code": "0052-2142",
  "name": "Maddi Rodd",
  "score": 22,
  "time": "6:22:09 PM"
}, {
  "id": 95,
  "sessionID": 3,
  "code": "21130-329",
  "name": "Jessamine Lathbury",
  "score": 53,
  "time": "9:22:21 AM"
}, {
  "id": 96,
  "sessionID": 4,
  "code": "0093-4180",
  "name": "Janna Peron",
  "score": 32,
  "time": "4:28:40 PM"
}, {
  "id": 97,
  "sessionID": 3,
  "code": "43857-0112",
  "name": "Lilith Battershall",
  "score": 5,
  "time": "8:39:30 PM"
}, {
  "id": 98,
  "sessionID": 4,
  "code": "66129-116",
  "name": "Ardella Speedy",
  "score": 94,
  "time": "8:44:52 PM"
}, {
  "id": 99,
  "sessionID": 5,
  "code": "62756-538",
  "name": "Laryssa Cregan",
  "score": 66,
  "time": "11:04:21 PM"
}, {
  "id": 100,
  "sessionID": 4,
  "code": "36987-1168",
  "name": "Kimmy Dowtry",
  "score": 19,
  "time": "6:30:29 PM"
}]    
`
);

