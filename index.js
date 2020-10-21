const request = require('request');
const cheerio = require('cheerio');
const Discord = require('discord.js');
const bot = new Discord.Client();

const Token = 'insert token here';

let user = "";
const PREFIX = "=";

bot.on('ready', () => {
    console.log('This bot is online');
});

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'guide':
            champguide(args[1], message);
            break;
    }

});


function leaguestats(username, message) {
    request('https://na.op.gg/summoner/userName=' + username, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            let winrate = $(".sub-tier__rank-tier").text();
            message.channel.send(winrate);
        } else {
            message.channel.send("Invalid name")
        }

    });
}

function champguide(champname, message) {
    request('https://na.op.gg/champion/' + champname + '/statistics', (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            let runes = [];
            let skillpath = [];
            let perks = [];
            let runefixed = [];

            $('.perk-page__item.perk-page__item--active').each(function(i, e) {
                runes[i] = $(this).children().children().attr('alt');
            });


            $('.active.tip').each(function(i, e) {
                perks[i] = $(this).attr('src').substr(49, 4);
            })
            console.log("perks" + perks);
            $('.champion-skill-build__table').each(function(i, e) {
                skillpath[i] = $(this).children().find('td').text().replace(/\s\s+/g, '>').slice(1, -1);
            });

            for (let j = 0; j < 6; j++) {
                let fixee = runes[j].replace(" ", "").replace(" ", "").replace(" ", "").replace(":", "").replace("'", "");
                runefixed[j] = getRuneImages(fixee);
            }

            for (let j = 0; j < 3; j++) {
                perks[j] = getRuneImages(perks[j]);
            }

            message.channel.send({
                embed: {
                    title: champname + 'setup',
                    url: 'https://na.op.gg/champion/' + champname + '/statistics',
                    fields: [
                        { name: 'runes', value: runefixed[0] + '\n' + runefixed[1] + '\n' + runefixed[2] + '\n' + runefixed[3], inline: true },
                        { name: 'runes', value: runefixed[4] + '\n' + runefixed[5], inline: true },
                        { name: 'perks', value: perks[0] + perks[1] + perks[2] },
                        { name: 'Skill Path', value: skillpath },
                    ],
                    thumbnail: 'https:' + $(".champion-stats-header-info__image").children().attr('src')
                }
            });

        } else {
            message.channel.send("Invalid name")
        }

    });
}

function getRuneImages(name) {
    switch (name) {
        case 'Scorch':
            return '<:Scorch:751940496988962978>';
            break;
        case 'Revitalize':
            return '<:Revitalize:751940497177837599>';
            break;
        case 'RelentlessHunter':
            return '<:RelentlessHunter:751940497274044458>';
            break;
        case 'RavenousHunter':
            return '<:RavenousHunter:751940497383227432>';
            break;
        case 'PrototypeOmnistone':
            return '<:PrototypeOmnistone:751940496921985068> ';
            break;
        case 'PresstheAttack':
            return '<:PresstheAttack:751940497295278131>';
            break;
        case 'PresenceofMind':
            return '<:PresenceofMind:751940497123049513> ';
            break;
        case 'Predator':
            return '<:Predator:751940497185964123> ';
            break;
        case 'PhaseRush':
            return '<:PhaseRush:751940497227907173> ';
            break;
        case 'PerfectTiming':
            return '<:PerfectTiming:751940496951214102> ';
            break;
        case 'LethalTempo':
            return '<:LethalTempo:751940497265917972>';
            break;
        case 'MagicalFootwear':
            return '<:MagicalFootwear:751940497047814255>';
            break;
        case 'ManaflowBand':
            return '<:ManaflowBand:751940497274306621>';
            break;
        case 'MinionDematerializer':
            return '<:MinionDematerializer:751940497022517380>';
            break;
        case 'NimbusCloak':
            return '<:NimbusCloak:751940496946888716>';
            break;
        case 'NullifyingOrb':
            return '<:NullifyingOrb:751940497228169266>';
            break;
        case 'Overgrowth':
            return '<:Overgrowth:751940497110466571>';
            break;
        case 'Overheal':
            return '<:Overheal:751940497240490024> ';
            break;
        case 'GraspoftheUndying':
            return '<:GraspoftheUndying:751940497072848998> ';
            break;
        case 'Guardian':
            return '<:Guardian:751940497290952745>';
            break;
        case 'HailofBlades':
            return '<:HailofBlades:751940497232363580>';
            break;
        case 'HextechFlashtraption':
            return '<:HextechFlashtraption:751940497244815472> ';
            break;
        case 'IngeniousHunter':
            return '<:IngeniousHunter:751940497320443904> ';
            break;
        case 'LastStand':
            return '<:LastStand:751940497232232488>';
            break;
        case 'LegendAlacrity':
            return '<:LegendAlacrity:751940497328570438> ';
            break;
        case 'LegendBloodline':
            return '<:LegendBloodline:751940497244684428> ';
            break;
        case 'LegendTenacity':
            return '<:LegendTenacity:751940496892362813>';
            break;
        case 'Demolish':
            return '<:Demolish:751939205738791014>';
            break;
        case 'Electrocute':
            return '<:Electrocute:751939205705236490>  ';
            break;
        case 'EyeballCollection':
            return '<:EyeballCollection:751939205722144808>';
            break;
        case 'FleetFootwork':
            return '<:FleetFootwork:751939205701042227>';
            break;
        case 'FontofLife':
            return '<:FontofLife:751940497198547155>';
            break;
        case 'FuturesMarket':
            return '<:FuturesMarket:751940497232232458>';
            break;
        case 'GlacialAugment':
            return '<:GlacialAugment:751940497324638328>';
            break;
        case 'GhostPoro':
            return '<:GhostPoro:751940497269981184>';
            break;
        case 'GatheringStorm':
            return '<:GatheringStorm:751940497257529405>';
            break;
        case 'DarkHarvest':
            return '<:DarkHarvest:751939205680332860>';
            break;
        case 'CutDown':
            return ' <:CutDown:751939205726339272> ';
            break;
        case 'CoupdeGrace':
            return '<:CoupdeGrace:751939205336137760> ';
            break;
        case 'CosmicInsight':
            return '<:CosmicInsight:751939205718081707> ';
            break;
        case 'Conqueror':
            return '<:Conqueror:751939205390794783> ';
            break;
        case 'Conditioning':
            return '<:Conditioning:751939205197856829> ';
            break;
        case 'CheapShot':
            return '<:CheapShot:751939205474549832> ';
            break;
        case 'Celerity':
            return '<:Celerity:751939205298389068> ';
            break;
        case 'BonePlating':
            return '<:BonePlating:751939205193793649>';
            break;
        case 'BiscuitDelivery':
            return '<:BiscuitDelivery:751939205487394834> ';
            break;
        case 'ArcaneComet':
            return '<:ArcaneComet:751939205545984110> ';
            break;
        case 'ApproachVelocity':
            return '<:ApproachVelocity:751939204191223929> ';
            break;
        case 'Aftershock':
            return '<:Aftershock:751939204367515678> ';
            break;
        case 'AbsoluteFocus':
            return '<:AbsoluteFocus:751939203805347856>';
            break;
        case 'ZombieWard':
            return '<:ZombieWard:751960050087493662> ';
            break;
        case 'Waterwalking':
            return '<:Waterwalking:751960050125373460> ';
            break;
        case 'UnsealedSpellbook':
            return '<:UnsealedSpellbook:751960050079236227> ';
            break;
        case 'Unflinching':
            return '<:Unflinching:751960049961664592>';
            break;
        case 'UltimateHunter':
            return '<:UltimateHunter:751960049970053271> ';
            break;
        case 'Triumph':
            return '<:Triumph:751960049856807003> ';
            break;
        case 'Transcendence':
            return '<:Transcendence:751960049974509568>';
            break;
        case 'TimeWarpTonic':
            return '<:TimeWarpTonic:751960049814863903> ';
            break;
        case 'TasteofBlood':
            return '<:TasteofBlood:751960049995481088>';
            break;
        case 'SummonAery':
            return '<:SummonAery:751960049638965270>';
            break;
        case 'SuddenImpact':
            return ' <:SuddenImpact:751960049978441868>';
            break;
        case 'ShieldBash':
            return ' <:ShieldBash:751960050066653204>';
            break;
        case 'SecondWind':
            return '<:SecondWind:751961457788190790';
            break;
        case '5001':
            return '<:5001:751988530833653863>';
            break;
        case '5002':
            return '<:5002:751988530867339456>';
            break;
        case '5003':
            return '<:5003:751988531068665906> ';
            break;
        case '5005':
            return '<:5005:751988530661818399>';
            break;
        case '5007':
            return '<:5007:751988530825134151>';
            break;
        case '5008':
            return '<:5008:751988530926059552>';
            break;
    }
}

function getItems(name) {
    switch (name) {
        case 'TheBloodthirster':
            return '<:TheBloodthirster:752257306749567066> ';
            break;
        case 'TheBlackCleaver':
            return '<:TheBlackCleaver:752257306418348113> ';
            break;
        case 'LordDominiksRegards':
            return '<:LordDominiksRegards:752257306565148752>';
            break;
        case 'LocketoftheIronSolari':
            return '<:LocketoftheIronSolari:752257306301038684> ';
            break;
        case 'LichBane':
            return '<:LichBane:752257306594639972> ';
            break;
        case 'LiandrysTorment':
            return '<:LiandrysTorment:752257306183467049> ';
            break;
        case 'KnightsVow':
            return '<:KnightsVow:752257306351239259> ';
            break;
        case 'Juggernaut':
            return '<:Juggernaut:752257306686652507>';
            break;
        case 'IonianBootsofLucidity':
            return '<:IonianBootsofLucidity:752257306653360249> ';
            break;
        case 'InfinityEdge':
            return '<:InfinityEdge:752257306204438601> ';
            break;
        case 'IcebornGauntlet':
            return '<:IcebornGauntlet:752257306250576043>';
            break;
        case 'HextechProtobelt01':
            return '<:HextechProtobelt01:752257306443513978> ';
            break;
        case 'HextechGunblade':
            return '<:HextechGunblade:752257306649034782> ';
            break;
        case 'HextechGLP800':
            return '<:HextechGLP800:752257306649165854> ';
            break;
        case 'GuinsoosRageblade':
            return '<:GuinsoosRageblade:752257306661617784> ';
            break;
        case 'GuardianAngel':
            return '<:GuardianAngel:752257306493976668> ';
            break;
        case 'GargoyleStoneplate':
            return '<:GargoyleStoneplate:752257306661748786> ';
            break;
        case 'FrozenMallet':
            return '<:FrozenMallet:752257306724401152> ';
            break;
        case 'FrozenHeart':
            return '<:FrozenHeart:752257306716274688> ';
            break;
        case 'EssenceReaver':
            return '<:EssenceReaver:752257306762281200>';
            break;
        case 'EdgeofNight':
            return '<:EdgeofNight:752257306670137516> ';
            break;
        case 'DuskbladeofDraktharr':
            return '<:DuskbladeofDraktharr:752257306707755008>';
            break;
        case 'DeathsDance':
            return '<:DeathsDance:752257306682720306>';
            break;
        case 'DeadMansPlate':
            return '<:DeadMansPlate:752257306904887396>';
            break;
        case 'BulwarkoftheMountain':
            return '<:BulwarkoftheMountain:752257306766475332> ';
            break;
        case 'BootsofSwiftness':
            return '<:BootsofSwiftness:752257306699235488> ';
            break;
        case 'BootsofMobility':
            return '<:BootsofMobility:752257306594508902> ';
            break;
        case 'BladeoftheRuinedKing':
            return '<:BladeoftheRuinedKing:752257306787577937>';
            break;
        case 'Bloodrazor':
            return '<:Bloodrazor:752257306472874045> ';
            break;
        case 'BlackMistScythe':
            return '<:BlackMistScythe:752257306741178489> ';
            break;
        case 'BerserkersGreaves':
            return '<:BerserkersGreaves:752257306795704420> ';
            break;
        case 'BansheesVeil':
            return '<:BansheesVeil:752257306774864013>';
            break;
        case 'AthenesUnholyGrail':
            return '<:AthenesUnholyGrail:752257306535657563> ';
            break;
        case 'ArdentCenser':
            return '<:ArdentCenser:752257306883915907> ';
            break;
        case 'ArchangelsStaff':
            return '<:ArchangelsStaff:752257306514817147> ';
            break;
        case 'AdaptiveHelm':
            return '<:AdaptiveHelm:752257306787577967> ';
            break;
        case 'AbyssalMask':
            return '<:AbyssalMask:752257306548371457>';
            break;
        case 'ZhonyasHourglass':
            return '<:ZhonyasHourglass:752254370032254977> ';
            break;
        case 'ZekesConvergence':
            return '<:ZekesConvergence:752254370057420921> ';
            break;
        case 'YoumuusGhostblade':
            return '<:YoumuusGhostblade:752254370392965182> ';
            break;
        case 'WitsEnd':
            return '<:WitsEnd:752254370451685376> ';
            break;
        case 'Warrior':
            return '<:Warrior:752254370359279737>';
            break;
        case 'WarmogsArmor':
            return ' <:WarmogsArmor:752254370409873498> ';
            break;
        case 'VoidStaff':
            return '<:VoidStaff:752254370367668234> ';
            break;
        case 'UmbralGlaive':
            return '<:UmbralGlaive:752254370380513301> ';
            break;
        case 'TwinShadows':
            return '<:TwinShadows:752254370065678377> ';
            break;
        case 'TrinityForce':
            return '<:TrinityForce:752254370489303191> ';
            break;
        case 'TitanicHydra':
            return '<:TitanicHydra:752254370548023356> ';
            break;
        case 'Thornmail':
            return '<:Thornmail:752254370556674108> ';
            break;
        case 'SunfireCape':
            return '<:SunfireCape:752254370493628515>';
            break;
        case 'Stormrazor':
            return ' <:Stormrazor:752254370682241064> ';
            break;
        case 'SteraksGage':
            return '<:SteraksGage:752254370384576533> ';
            break;
        case 'StatikkShiv':
            return '<:StatikkShiv:752254370590228510> ';
            break;
        case 'SpiritVisage':
            return '<:SpiritVisage:752254370573451304> ';
            break;
        case 'Spellbinder':
            return '<:Spellbinder:752254370392965122>';
            break;
        case 'SorcerersShoes':
            return ' <:SorcerersShoes:752254370296365167> ';
            break;
        case 'ShurelyasReverie':
            return '<:ShurelyasReverie:752254370514731169> ';
            break;
        case 'ShardofTrueIce':
            return '<:ShardofTrueIce:752254370543829092> ';
            break;
        case 'SeraphsEmbrace':
            return '<:SeraphsEmbrace:752254370552348862> ';
            break;
        case 'SanguineBlade':
            return '<:SanguineBlade:752254370527182998>';
            break;
        case 'RylaisCrystalScepter':
            return ' <:RylaisCrystalScepter:752254370267136142> ';
            break;
        case 'RunaansHurricane':
            return '<:RunaansHurricane:752254370631909406> ';
            break;
        case 'RodofAges':
            return '<:RodofAges:752254370980036628>';
            break;
        case 'RighteousGlory':
            return ' <:RighteousGlory:752254370640560128> ';
            break;
        case 'Redemption':
            return '<:Redemption:752254370493628476> ';
            break;
        case 'RavenousHydra':
            return '<:RavenousHydra:752254370313273393> ';
            break;
        case 'RapidFirecannon':
            return '<:RapidFirecannon:752254370632040459> ';
            break;
        case 'RanduinsOmen':
            return '<:RanduinsOmen:752254370648686673> ';
            break;
        case 'RabadonsDeathcap':
            return '<:RabadonsDeathcap:752254370837692598>';
            break;
        case 'PhantomDancer':
            return ' <:PhantomDancer:752254370787098663> ';
            break;
        case 'PerfectHexCore':
            return '<:PerfectHexCore:752254370535571530> ';
            break;
        case 'PauldronsofWhiterock':
            return '<:PauldronsofWhiterock:752254370657075261> ';
            break;
        case 'NinjaTabi':
            return '<:NinjaTabi:752254370699149405> ';
            break;
        case 'NashorsTooth':
            return '<:NashorsTooth:752254370527182979>';
            break;
        case 'Muramana':
            return ' <:Muramana:752254370652880956> ';
            break;
        case 'MortalReminder':
            return '<:MortalReminder:752254370694823966>';
            break;
        case 'Morellonomicon':
            return ' <:Morellonomicon:752254370690629753> ';
            break;
        case 'MikaelsCrucible':
            return '<:MikaelsCrucible:752254370342633573> ';
            break;
        case 'MercurysTreads':
            return '<:MercurysTreads:752254370753675375>';
            break;
        case 'MercurialScimitar':
            return ' <:MercurialScimitar:752254370736898098>';
            break;
        case 'MejaisSoulstealer':
            return ' <:MejaisSoulstealer:752254370728640562> ';
            break;
        case 'MawofMalmortius':
            return '<:MawofMalmortius:752254370627977318> ';
            break;
        case 'Manamune':
            return '<:Manamune:752254370682372127> ';
            break;
        case 'Magus':
            return '<:Magus:752254370539896974> ';
            break;
        case 'LudensEcho':
            return '<:LudensEcho:752254370732572753>';
            break;

    }
}

bot.login(Token);