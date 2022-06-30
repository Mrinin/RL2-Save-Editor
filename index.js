// As a note...
// If a new field is ever needed to add:
// a new offset
// new element ID
// new dict
// new list
// new set_fields
// new display_properties entries and variable passing to set_fields
// and new download_fields are needed to be added

//// FUTURE ME PROBLEM:
// FIX OFFSET NOT WORKING WITH NAMES. FUCKER.


/*const offset_class = 5867;
const offset_trait1 = 5969;
const offset_trait2 = 5982;
const offset_weapon = 5906;
const offset_talent = 5932;
const offset_spell = 5919;*/

	// 418: Trait 1
	// 431: Trait 2

	// 317: Class
	// 356: Weapon
	// 382: Talent
	// 369: Spell

const offset_class = 6;
const offset_trait1 = 108;
const offset_trait2 = 121;
const offset_weapon = 45;
const offset_talent = 71;
const offset_spell = 58;

let bytes = [];
let bytes_str;
//let bytes_offset = 0;
let character_offset = 0
let relic_offset = 0

let presets = document.getElementById('presets');

let slot_weapon = document.getElementById('slot_weapon');
let slot_talent = document.getElementById('slot_talent');
let slot_spell = document.getElementById('slot_spell');
let slot_trait1 = document.getElementById('slot_trait1');
let slot_trait2 = document.getElementById('slot_trait2');
let slot_class = document.getElementById('slot_class');
let slot_addrelic = document.getElementById('slot_addrelic');
let slot_relics = document.getElementById('slot_relics');

var class_dict_reverse = {};
const class_dict = { 
	"0A" : "Knight",
	"46" : "Valkyrie",
	"14" : "Barbarian",
	"1E" : "Mage",
	"8C" : "Chef ",
	"A0" : "Dragon Lancer",
	"C8" : "Bard",
	"28" : "Assassin",
	"5A" : "Ranger",
	"32" : "Duelist",
	"96" : "Boxer",
	"AA" : "Gunslinger",
	"B4" : "Ronin",
	"BE" : "Pirate",
	"D2" : "Astromancer"
}

var trait_dict_reverse;
const trait_dict = { 
	"00000000": "None",
	"D2000000": "Pacifist",
	"0E010000": "Combative",
	"BE000000": "One Hit Wonder (Osteogenesis Imperfecta)",
	"56010000": "Alexithymia",
	"54010000": "Crippling Intellect",
	"3E030000": "Algesia",
	"A2030000": "Perfectionist",
	"66030000": "Masochist",
	"10270000": "Antique",
	"22010000": "Hypergonadism",
	"70030000": "Compulsive Gambling",
	"5F000000": "Ectomorph",
	"9A010000": "Histrionic",
	"5A000000": "Endomorph",
	"0C030000": "Vampirism",
	"0A000000": "Colorblind",
	"96000000": "Minimalist (OCD)",
	"98030000": "Methemoglobinemia (Blue)",
	"68010000": "Charismatic",
	"3A020000": "Disattuned",
	"18010000": "Bookish",
	"59010000": "Spelunker",
	"34030000": "Cartographer",
	"46000000": "Dwarfism",
	"52030000": "Hero Complex",
	"84030000": "Compulsive Hoarding",
	"26020000": "Vegan",
	"08020000": "Gigantism",
	"57010000": "Emotional Dysregularity",
	"08020000": "Synthesis",
	"5C030000": "Dyspraxia",
	"0E010000": "Superfluid",
	"8C000000": "Muscle Weakness",
	"E6000000": "IIB Muscle Fibers",
	"04010000": "Aerodynamic",

	"55010000": "FMF Fan",
	"B6030000": "Paranoid",
	"C0030000": "Exploding Casket Syndrome",
	"7A030000": "Hypercoagulation",
	"D6010000": "Hollow Bones",
	"DE030000": "Contrarian",
	"CC010000": "Puritan",
	"E4020000": "Super IBS",
	"FE010000": "Panic Attacks",

	"CE010000": "Dissociative Agnosia"
}

var weapon_dict_reverse;
const item_dict = { 
	"14000000": "W: Sword",
	"3E000000": "W: Pizza",
	"28000000": "W: Axe",
	"29000000": "W: Hepheus Hammer",
	"32000000": "W: Bow",
	"37000000": "W: Ballistic Bow",
	"7F000000": "W: Lute",
	"35000000": "W: Electric Lute",
	"42000000": "W: Dual Blades",
	"46000000": "W: Wand of Blasting",
	"7A000000": "W: Charon Scythe",
	"1E000000": "W: Fauchard",
	"5A000000": "W: Sabre",
	"3C000000": "W: Frying Pan",
	"3D000000": "W: Bag of Spoons",
	"44000000": "W: Boxing Gloves",
	"7E000000": "W: Enkindled Gauntlets",
	"78000000": "W: Charge Lance",
	"36000000": "W: Kinetic Revolver",
	"7C000000": "W: Katana",
	"50000000": "W: Cannon",
	"80000000": "W: Celestial Sceptre",

	"D2000000": "T: Shout",
	"C8000000": "T: Shield",
	"31010000": "T: Crescendo",
	"04010000": "T: Obscura",
	"45010000": "T: Deflect",
	"F0000000": "T: Ivy Canopy",
	"22010000": "T: Combat Roll",
	"E1000000": "T: Stew",
	"54010000": "T: Knockout Punch",
	"56010000": "T: Bastion",
	"26010000": "T: Makeshift Explosive",
	"58010000": "T: Immortal Kotetsu",
	"5A010000": "T: Pirate Ship",
	"5B010000": "T: Comet Form",

	"8C000000": "S: Fireball",
	"A2000000": "S: Blaze Bellow",
	"9C000000": "S: Tesla Spike",
	"A0000000": "S: Wind Shield",
	"B8000000": "S: Prismatic Spectrum",
	"9B000000": "S: Flame Barrier",
	"B4000000": "S: Shockwave",
	"B5000000": "S: Magic 8 Ball",
	"B2000000": "S: Searing Shot",
	"B7000000": "S: Gravity Beam",
	"BA000000": "S: White Star",
	"BB000000": "S: Fungal Spread",
	"BD000000": "S: Freeze Strike",
	"B9000000": "S: Lightning Strike",
	"8D000000": "S: Poison Bomb",
	"91000000": "S: Magma Mass"

}

const relic_dict = {
	"51":	  "Hyperion&#39s Broken Ring",
	"102":    "Aether&#39s Wings ",
	"153":    "Serrated Handle&#39 Bargain",
	"204":    "Future Successor&#39s Bargain",
	"255":    "Ambrosia (OLD)",
	"306":    "Fate&#39s Die",
	"357":    "Coeus&#39 Shell (OLD)",
	"408":    "Glowing Ember",
	"459":    "Ivy Seed",
	"510":    "Freon&#39s Reward",
	"561":    "Gnawed Bone",
	"612":    "MEAT CHANCE UP",
	"663":    "Ambrosia",
	"714":    "Rage Tincture",
	"765":    "Catalyst",
	"816":    "DAMAGE REDUCTION STATUS EFFECT",
	"867":    "The Heavy Stone Bargain",
	"918":    "War Drum",
	"969":    "Ameterasu&#39s Sun",
	"1020":    "SPELL BURN ADD_1",
	"1071":    "SPELLS DAMAGE CLOUD",
	"1122":    "Body Buffet",
	"1173":    "Lily of the Valley 1",
	"1224":    "Lily of the Valley 2",
	"1275":    "Lily of the Valley 3",
	"1326":    "Hermes Boots",
	"1377":    "Lotus Petal",
	"1428":    "Steel Toed Boots",
	"1479":    "Diogenes Bargain",
	"1530":    "Cosmic Insight",
	"1581":    "Antikythera",
	"1632":    "Skeleton Key",
	"1683":    "Broken Key",
	"1734":    "Vanguard Banner",
	"1785":    "Pandora&#39s Trial",
	"1836":    "Pandora&#39s Reward",
	"1887":    "Lachesis&#39 Measure",
	"1938":    "Atropos Scissors",
	"1989":    "Clotho&#39s Spindle",
	"2040":    "Blessing of Strength",
	"2091":    "Blessing of Wisdom",
	"2142":    "Blessing of Talent",
	"2193":    "Zealot&#39s Ring",
	"2244":    "Weird Mushrooms",
	"2295":    "Grave Bell",
	"2346":    "GOLD INTO RESOLVE ",
	"2397":    "Incandescent Telescope (OLD)",
	"2448":    "Boxing Bell",
	"2499":    "Achilles&#39 Shield",
	"2550":    "Hector&#39s Helm",
	"2601":    "Coeus&#39 Shield",
	"2652":    "Empty Vessel",
	"2703":    "Lotus Stem",
	"2754":    "Charon&#39s Trial",
	"2805":    "Charon&#39s Reward",
	"2856":    "Nothing??? (Ancestral Soul?)",
	"2907":    "Ancestral Dust",
	"2958":    "Cornucopia",
	"3009":    "Obelisk",
	"3060":    "Dream Catcher",
	"3111":    "The Heavy Stone Bargain (OLD)",
	"3162":    "Serqet&#39s Stinger",
	"3213":    "Onyx Key",
	"3264":    "Pearl Key",
	"3315":    "Raven&#39s Ring",
	"3366":    "Heron&#39s Ring",
	"3417":    "Soul Tether",
	"3468":    "Ivy Roots",
	"3519":    "Corrupting Reagent",
	"3570":    "Lamech&#39s Whetstone",
	"3621":    "Incandescent Telescope	",
	"3672":    "Caltrops (Removed in EA)",
	"3723":    "The Icarus&#39 Wings Bargain",
	"3774":    "Voltaic Circlet",
	"3825":    "Marble Statue",
	"3876":    "Demeter&#39s Trial",
	"3927":    "Demeter&#39s Reward",
	"3978":    "Arcane Necklace",
	"4029":    "Red Sand Hourglass",
	"4080":    "Aite&#39s Sword",
	"4131":    "Aite&#39s Broken Sword",
	"4182":    "Weighted Anklet"
}

let spawned_relics = []

let item_list = Object.keys(item_dict);
let trait_list = Object.keys(trait_dict);
let class_list = Object.keys(class_dict);
let relic_list = Object.keys(relic_dict);

let slots = document.getElementById('slots');
console.log(slots)
slots.style.display = "none"

function change_to_preset()
{
	preset = presets.value

	if(preset == 1)
	{
		slot_class.value = "1E";
		slot_trait1.value = "54010000";
		slot_trait2.value = "57010000";
		slot_weapon.value = "BB000000";
		slot_talent.value = "B8000000";
		slot_spell.value  = "A0000000";
	}

	if(preset == 2)
	{
		slot_class.value = "14";
		slot_trait1.value = "0E010000";
		slot_trait2.value = "00000000";
		slot_weapon.value = "54010000";
		slot_talent.value = "22010000";
		slot_spell.value  = "58010000";
	}

	if(preset == 3)
	{
		slot_class.value = "A0";
		slot_trait1.value = "98030000";
		slot_trait2.value = "22010000";
		slot_weapon.value = "1E000000";
		slot_talent.value = "3C000000";
		slot_spell.value  = "50000000";
	}
	// Sword Shield Pizza
	if(preset == 4)
	{
		slot_class.value = "0A";

		slot_weapon.value = "14000000";
		slot_talent.value = "C8000000";
		slot_spell.value  = "3E000000";
	}

	// Lute HAHA Guitar
	if(preset == 5)
	{
		slot_class.value = "C8";

		slot_weapon.value = "7F000000";
		slot_talent.value = "31010000";
		slot_spell.value  = "35000000";
	}

	// Bow Ivy Bow
	if(preset == 6)
	{
		slot_class.value = "5A";

		slot_weapon.value = "32000000";
		slot_talent.value = "F0000000";
		slot_spell.value  = "37000000";
	}

	// hammer barb
	if(preset == 7)
	{
		slot_class.value = "14";

		slot_weapon.value = "28000000";
		slot_talent.value = "D2000000";
		slot_spell.value  = "29000000";
	}

	
	// glove boxer
	if(preset == 8)
	{
		slot_class.value = "96";

		slot_weapon.value = "44000000";
		slot_talent.value = "54010000";
		slot_spell.value  = "7E000000";
	}

	// double staff mage
	if(preset == 9)
	{
		slot_class.value = "1E";

		slot_weapon.value = "46000000";
		//slot_talent.value = "54010000";
		slot_spell.value  = "7A000000";
	}

	if(preset == 10)
	{
		slot_class.value = "32";
		slot_trait1.value = "BE000000";
		slot_trait2.value = "D2000000";
		slot_weapon.value = "5A000000";
		slot_talent.value = "22010000";
		slot_spell.value  = "BD000000";
	}
}

// This is fucked. So appearently, you know how the game shows the relics and traits you did not encounter yet as ???.
// Yes that is stored in the save file. as a list. Not an array. Meaning, this too, can change the save file length.
// Instead of relying on offset, we have to find constant values and compare them.
function find_offsets()
{
 	const relic_lookfor = "6B5F5F4261636B696E674669656C6400000000000400000408080B01010C52656C69634D6F64547970650200000001010952656C696354797065";
	// This is right AFTER the name, 5822
	//const relic_lookfor = ""
	 						
	// 86 offsets AFTER this.
    //const character_lookfor = "4E616D6508497346656D616C65124475706C69636174654E616D65436F756E7409497352657469726564094973566963746F727909436C6173735479706506576561706F6E055370656C6C0654616C656E740854726169744F6E6508547261697454776F0F416E74697175654F6E654F776E65640F416E746971756554776F4F776E65640745796554797065094D6F757468547970650E46616369616C48616972547970650D536B696E436F6C6F72547970650848616972547970650D48616972436F6C6F725479706508426F647954797065114564676545717569706D656E7454797065114361706545717569706D656E745479706512436865737445717569706D656E7454797065114865616445717569706D656E7454797065145472696E6B657445717569706D656E7454797065";
	const character_lookfor = "436C61737354797065010000000776616C75655F5F"

	relic_offset = (bytes_str.indexOf(relic_lookfor) + relic_lookfor.length) / 2 + 35
	console.log(relic_offset)

	character_offset = (bytes_str.indexOf(character_lookfor) + character_lookfor.length) / 2
	// 418: Trait 1
	// 431: Trait 2

	// 317: Class
	// 356: Weapon
	// 382: Talent
	// 369: Spell
}

function set_fields(_class, _trait1, _trait2, _weapon, _talent, _spell) 
{
	slots.style.display = "block"

	// This changes item slots.
	for (var i = 0; i<item_list.length; i++)
	{
		for (let j = 0; j < 3; j++) {
			var opt = document.createElement('option');
			opt.value = item_list[i];
			opt.innerHTML = item_dict[item_list[i]];

			if (j == 0)
				slot_weapon.appendChild(opt);
			else if(j == 1)
				slot_talent.appendChild(opt);
			else if(j == 2)
				slot_spell.appendChild(opt);
		}
	}

	// This one traits.
	for (var i = 0; i<trait_list.length; i++)
	{
		for (let j = 0; j < 3; j++) {
			var opt = document.createElement('option');
			opt.value = trait_list[i];
			opt.innerHTML = trait_dict[trait_list[i]];

			if (j == 0)
				slot_trait1.appendChild(opt);
			else if(j == 1)
				slot_trait2.appendChild(opt);
		}
	}

	// And this one classes.
	for (var i = 0; i<class_list.length; i++){
		var opt = document.createElement('option');
		opt.value = class_list[i];
		opt.innerHTML = class_dict[class_list[i]];
		slot_class.appendChild(opt);
	}
	console.log(_class)

	slot_class.value = _class;
	slot_trait1.value = _trait1;
	slot_trait2.value = _trait2;

	slot_weapon.value = _weapon;
	slot_talent.value = _talent;
	slot_spell.value = _spell;

	// This one spawns the "add relics" list. it does not load the owned relics.
	var none_option = document.createElement('option');
	none_option.value = 0
	none_option.innerHTML = "Pick a relic to add"
	slot_addrelic.appendChild(none_option);


	for (let i = 0; i < relic_list.length; i++) {
		const element = relic_list[i];
		var opt = document.createElement('option');
		opt.value = relic_list[i];
		opt.innerHTML = relic_dict[relic_list[i]];
		slot_addrelic.appendChild(opt);
	}
}

function set_relic_fields(relics)
{
	for (let i = 0; i < relics.length; i++) {
		const element = relics[i];
		set_relic_field(element[0], element[1])
	}
}

// Creates a relic field for the HTML list. If the relic is already there,
//does not create, and instead updates the field if the field already exists.
function set_relic_field(id, value)
{
	if(spawned_relics.includes(id)){
		entry = document.getElementById("relic_" + id);
		entry.value = value;
	}
	else
	{
		var desc = document.createElement('p');
		var entry = document.createElement('input');
		var del = document.createElement('button');

		entry.id = "relic_" + id
		entry.value = value

		desc.style.display = "flex";
		desc.innerText = String(relic_dict[id]).replace("&#39","\'") + ": "
		desc.id = "relic_desc_" + id

		del.onclick = function() {remove_relic(id)}
		del.innerText = "-"

		slot_relics.appendChild(desc)
		desc.appendChild(entry)
		desc.appendChild(del)

		spawned_relics.push(id)
	}
}


// Removes a relic from the HTML list.
function remove_relic(id)
{
	console.log(id);
	if(spawned_relics.includes(id)){
		entry = document.getElementById("relic_desc_" + id);
		entry.parentNode.removeChild(entry);
		remove_item_from_array(spawned_relics, id)
	}

	console.log(spawned_relics)
}

// this inserts all relics in spawned_relics to bytes
function insert_relics()
{
	for (let i = 0; i < relic_list.length; i++) {
		const element = Number(relic_list[i]);
		bytes[element + relic_offset + 0] = "00"
		bytes[element + relic_offset  + 1] = "00"
		bytes[element + relic_offset  + 2] = "00"
		bytes[element + relic_offset  + 3] = "00"
	}

	for (let i = 0; i < spawned_relics.length; i++) {
		const id = Number(spawned_relics[i]);
		const val = dec_to_hex(parseInt(document.getElementById("relic_" + id).value))
		console.log(relic_offset)
		console.log(id)
		insert_into_array(relic_offset + id, val)
	}
}

function add_relic()
{
	let new_relic = slot_addrelic.value
	if(new_relic == 0)
		return;

	console.log("New relic added: " + relic_dict[String(new_relic)])
	set_relic_field(new_relic, 1)
	slot_addrelic.value = 0
}

// https://stackoverflow.com/questions/44287769/parsing-a-little-endian-hex-string-to-decimal
// it's my code now
function convert_to_little_endian(hex)
{
	var r = (parseInt('0x'+hex.match(/../g).reverse().join(''))).toString(16).toUpperCase();
	return r
}

function dec_to_hex(number)
{
	let output = number.toString(16)
	let len = output.length

	// adds preceeding zeroes
	for (let i = 0; i < 8 - len; i++) {
		output = "0" + output
	}

	output = changeEndianness(output)
	return output
}

// https://stackoverflow.com/questions/5320439/how-do-i-swap-endian-ness-byte-order-of-a-variable-in-javascript
// this tool is sponsored by stack overflow
const changeEndianness = (string) => {
	const result = [];
	let len = string.length - 2;
	while (len >= 0) {
	  result.push(string.substr(len, 2));
	  len -= 2;
	}
	return result.join('');
}

function doupload() {
    let data = document.getElementById("file_rl2class").files[0];
    let entry = document.getElementById("file_rl2class").files[0];
    console.log('doupload',entry,data)
	console.log(data)

	var file = new Blob([data]); // your file

	// https://stackoverflow.com/questions/5587973/javascript-upload-file

	bytes_str = ""
	var fr = new FileReader();
	fr.addEventListener('load', function () {
		var u = new Uint8Array(this.result),
			a = new Array(u.length)
			
		i = 0
		while (i < u.length) {
			// map to hex
			a[i] = (u[i] < 16 ? '0' : '') + u[i].toString(16).toUpperCase();
			bytes_str = bytes_str + a[i]
			i++
			//console.log(a[i])
		}
		console.log(a[0])
		u = null; // free memory
		console.log(a); // work with this
		display_properties(a)
	});
	fr.readAsArrayBuffer(file);
	//https://stackoverflow.com/questions/23144647/file-api-hex-conversion-javascript
	// I'm such a good programmer, really good at just stealing everything.
	//fetch('uploads/' + encodeURIComponent(entry.name), {method:'PUT',body:data});
    //location.reload();
}

function display_properties(_bytes)
{

	let a_gclass = 0
	let a_trait1 = {}
	let a_trait2 = {}
	let a_weapon = {}
	let a_talent = {}
	let a_spell = {}

	bytes = _bytes
	find_offsets()

	console.log(character_offset)
	console.log(offset_class)

	// This gets the hex of the fields. these are hardcoded.

	a_gclass = bytes[offset_class + character_offset]
	a_trait1 = bytes.slice(offset_trait1 + character_offset, offset_trait1 + character_offset + 4)
	a_trait2 = bytes.slice(offset_trait2 + character_offset, offset_trait2 + character_offset + 4)
	a_weapon = bytes.slice(offset_weapon + character_offset, offset_weapon  + character_offset+ 4)
	a_talent = bytes.slice(offset_talent + character_offset, offset_talent + character_offset + 4)
	a_spell = bytes.slice(offset_spell + character_offset, offset_spell + character_offset + 4)

	/*trait1 = trait_dict[bytes[5969 + offset]]
	trait2 = trait_dict[bytes[5982 + offset]]
	weapon = weapon_dict[bytes[5906 + offset]]
	talent = talent_dict[bytes[5932 + offset]]
	spell = spell_dict[bytes[5919 + offset]]*/

	// This makes a list of arrays like ["01","02","03","04"] -> 01020304

	gclass = a_gclass.toUpperCase();
	trait1 = join_list(a_trait1);
	trait2 = join_list(a_trait2);
	weapon = join_list(a_weapon);
	talent = join_list(a_talent);
	spell = join_list(a_spell);

	set_fields(gclass,trait1,trait2,weapon,talent,spell)

	const relics = get_relic_list()
	set_relic_fields(relics);

	/*console.log(bytes);
	console.log(class_dict[gclass]);
	console.log(trait_dict[trait1]);
	console.log(trait_dict[trait2]);
	console.log(item_dict[weapon]);
	console.log(item_dict[talent]);
	console.log(item_dict[spell]);*/

	console.log(gclass);
	console.log(trait1);
	console.log(trait2);
	console.log(weapon);
	console.log(talent);
	console.log(spell);

	//var s = 
	//console.log(s);
	//reverse_lists()
	/*item_dict.keys.forEach(element => {
		console.log("1");
		console.log(element);
	});*/

	//console.log(reverse_class_dict[gclass]);
}

function download()
{
	/*if(bytes = [])
		return*/

	let _class = slot_class.value;
	let _trait1 = slot_trait1.value;
	let _trait2 = slot_trait2.value;
	let _weapon = slot_weapon.value;
	let _talent = slot_talent.value;
	let _spell = slot_spell.value;

	insert_into_array(offset_class + character_offset, _class)
	insert_into_array(offset_trait1 + character_offset, _trait1)
	console.log("not here")
	insert_into_array(offset_trait2 + character_offset, _trait2)
	insert_into_array(offset_weapon + character_offset, _weapon)
	insert_into_array(offset_talent + character_offset, _talent)
	insert_into_array(offset_spell + character_offset, _spell)

	console.log("not heree")
	insert_relics()
	console.log,("not hereee")

	console.log(bytes)
	let bytes1 = convert_to_uint_array(bytes);
	var bytes2 = new Uint8Array(bytes1);
	var blob=new Blob([bytes2], {type: "rc2dat"});// change resultByte to bytes

	var link=document.createElement('a');
	link.href=window.URL.createObjectURL(blob);
	link.download="Player.rc2dat";
	link.click();
	//download_file("test", "huh test");

	// Ctrl C + V: Copies attacks from enemies and recasts them! Scales with INT.
	// https://stackoverflow.com/questions/39495826/converting-byte-array-output-into-blob-corrupts-file
	// https://stackoverflow.com/questions/58458732/how-can-i-create-a-file-object-through-byte-array

}

function download_file(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
  
	element.style.display = 'none';
	document.body.appendChild(element);
  
	element.click();
  
	document.body.removeChild(element);
}

function get_relic_list()
{
	let result = []

	for (let i = 0; i < relic_list.length; i++) {
		const element = Number(relic_list[i]);
		// this... gets the the count of a relic and then converts that to dec.
		const count = littleEndianHexStringToDecimal(join_list(bytes.slice(element + relic_offset, element + relic_offset + 4)));
	
		if (count != 0)
		{
			// it adds the relic to a list of relics with its count to display it in HTMl
			result.push( [element, count] )
		}
	}

	return result
}


// Shamelessly stealing again.
// https://stackoverflow.com/questions/44287769/parsing-a-little-endian-hex-string-to-decimal
function littleEndianHexStringToDecimal(string)
{
    if(!string) return undefined;
    var len = string.length;
    var bigEndianHexString = "0x";
    for(var i = 0; i < len/2; i++)
    {
        bigEndianHexString += string.substring((len-((i+1)*2)),(len-(i*2)));
    }
    return parseInt(bigEndianHexString);
}

// This converts string hex to string int "01020304" => ["01","02","03","04"]
function make_list(string)
{
	list = string.match(/.{1,3}/g)
	return list
}

function join_list(list)
{
	let result = ""
	for(var i in list)
	{
		result += list[i].toString()
	}
	return result.toUpperCase();
}

function remove_item_from_array(array, item)
{
	const index = array.indexOf(item);
	if (index > -1) {
		array.splice(index, 1); // 2nd parameter means remove one item only
	}
}

function insert_into_array(offset, value)
{
	// https://stackoverflow.com/questions/6259515/how-can-i-split-a-string-into-segments-of-n-characters
	// "bytes_offset" is the offset determined by the length of player character's name.
	var array = value.match(/.{1,2}/g);
	var index = offset;
	bytes.splice(index, array.length, ...array)
	//console.log("11");
	//bytes.splice.apply(bytes, [index, array.length].concat(array));

	console.log[bytes[index]]
}

function convert_to_uint_array(hex_array)
{
	// this functio converts hex string arrays to uint array. ["1F","22"] -> [31, 34]
	output = [];

	console.log(hex_array.length)
	for (let i = 0; i < hex_array.length; i++) {
		// The second paramater is the base.
		const element = parseInt(hex_array[i], 16);
		output.push(element);
		//console.log(element)
	}

	return output;
}