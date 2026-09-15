/**
 * VAPOK GAMING — BBS DOOR GAMES SUITE v2026.1
 * Authentic Retro Terminal Doors:
 * 1. Legend of the Red Dragon (L.O.R.D.)
 * 2. TradeWars 2002 (TW2002)
 * 3. Barren Realms Elite (BRE)
 */

window.BBSDoorManager = (function () {
  'use strict';

  let activeDoor = null;
  let printFn = null;
  let promptFn = null;

  function setPrintFunction(fn) {
    printFn = fn;
  }

  function setPromptFunction(fn) {
    promptFn = fn;
  }

  function output(text, type = 'info') {
    if (typeof printFn === 'function') {
      printFn(text, type);
    } else {
      console.log(`[BBS] ${text}`);
    }
  }

  function setPrompt(label, placeholder = '') {
    if (typeof promptFn === 'function') {
      promptFn(label, placeholder);
    }
  }

  function isDesktop() {
    return window.innerWidth > 768;
  }

  function resetToDefaultPrompt() {
    setPrompt('user@vapok.io:~$', 'Enter command (e.g. boot, help, status, mods, games)...');
  }

  /* ==========================================================================
     DOOR SELECTION MENU
     ========================================================================== */
  function showDoorsMenu() {
    if (!isDesktop()) {
      output('// NOTICE: BBS Door games are designed for desktop terminal matrix interfaces.', 'warn');
      output('Please connect via desktop workstation to access full BBS doors.', 'info');
      resetToDefaultPrompt();
      return;
    }

    activeDoor = 'menu';
    output('╔═══════════════════════════════════════════════════════════════════════════╗', 'warn');
    output('║                   VAPOK BBS DOOR MATRIX // NODE 0x7F                      ║', 'cmd');
    output('╠═══════════════════════════════════════════════════════════════════════════╣', 'warn');
    output('║  [1] Legend of the Red Dragon (L.O.R.D. v2026.1)                          ║', 'success');
    output('║  [2] TradeWars 2002 (Space Trading & Tactical Sector Combat)              ║', 'cmd');
    output('║  [3] Barren Realms Elite (Planetary 4X Strategy & Dominion)               ║', 'warn');
    output('║  [Q] Exit to Mainframe CLI Prompt                                         ║', 'info');
    output('╚═══════════════════════════════════════════════════════════════════════════╝', 'warn');
    setPrompt('BBS_DOOR [1-3, Q] >', 'Select Door # (1-3) or Q');
  }

  /* ==========================================================================
     GAME 1: LEGEND OF THE RED DRAGON (L.O.R.D.)
     ========================================================================== */
  const LORD = (function () {
    const WEAPONS = [
      { name: 'Wooden Stick', cost: 0, power: 2 },
      { name: 'Rusty Dagger', cost: 50, power: 5 },
      { name: 'Short Sword', cost: 150, power: 10 },
      { name: 'Broadsword', cost: 400, power: 18 },
      { name: 'Double Battle Axe', cost: 1000, power: 28 },
      { name: 'Warhammer of Might', cost: 2500, power: 42 },
      { name: 'Flaming Scimitar', cost: 6000, power: 60 },
      { name: 'Doom Blade', cost: 15000, power: 85 },
      { name: 'Excalibur of Legends', cost: 35000, power: 120 }
    ];

    const ARMORS = [
      { name: 'Tattered Cloth', cost: 0, defense: 1 },
      { name: 'Boiled Leather', cost: 50, defense: 4 },
      { name: 'Reinforced Ringmail', cost: 150, defense: 9 },
      { name: 'Tempered Chainmail', cost: 400, defense: 16 },
      { name: 'Steel Plate Armor', cost: 1000, defense: 25 },
      { name: 'Mythril Hauberk', cost: 2500, defense: 38 },
      { name: 'Adamantine Cuirass', cost: 6000, defense: 54 },
      { name: 'Runic Aegis', cost: 15000, defense: 75 },
      { name: 'Dragon Scale Armor', cost: 35000, defense: 105 }
    ];

    const FOREST_MONSTERS = [
      { name: 'Giant Forest Rat', minLvl: 1, hp: 12, atk: 4, gold: 15, exp: 12 },
      { name: 'Feral Woodland Wolf', minLvl: 1, hp: 20, atk: 7, gold: 28, exp: 22 },
      { name: 'Goblin Scout', minLvl: 2, hp: 32, atk: 11, gold: 50, exp: 45 },
      { name: 'Skeleton Footman', minLvl: 2, hp: 45, atk: 15, gold: 85, exp: 70 },
      { name: 'Bandit Highwayman', minLvl: 3, hp: 65, atk: 22, gold: 140, exp: 110 },
      { name: 'Cave Troll', minLvl: 4, hp: 95, atk: 30, gold: 220, exp: 180 },
      { name: 'Dark Elf Assassin', minLvl: 5, hp: 135, atk: 40, gold: 350, exp: 280 },
      { name: 'Mountain Wyvern', minLvl: 6, hp: 190, atk: 52, gold: 550, exp: 420 },
      { name: 'Shadow Knight', minLvl: 7, hp: 260, atk: 68, gold: 850, exp: 650 },
      { name: 'Abyssal Behemoth', minLvl: 8, hp: 360, atk: 88, gold: 1400, exp: 1000 }
    ];

    let player = null;
    let state = 'town'; // 'town', 'forest_combat', 'master_combat', 'dragon_combat', 'inn', 'weapons', 'armor'
    let currentEnemy = null;

    function defaultPlayer() {
      return {
        name: 'Vapok Adventurer',
        level: 1,
        hp: 30,
        maxHp: 30,
        gold: 100,
        gems: 1,
        exp: 0,
        expNext: 100,
        weaponIdx: 0,
        armorIdx: 0,
        forestFights: 10,
        dragonSlayer: false
      };
    }

    function load() {
      try {
        const raw = localStorage.getItem('vapok_bbs_lord');
        player = raw ? JSON.parse(raw) : defaultPlayer();
      } catch (e) {
        player = defaultPlayer();
      }
      if (!player.forestFights && player.forestFights !== 0) player.forestFights = 10;
    }

    function save() {
      try {
        localStorage.setItem('vapok_bbs_lord', JSON.stringify(player));
      } catch (e) {}
    }

    function start() {
      load();
      state = 'town';
      output('======================================================================', 'warn');
      output('          LEGEND OF THE RED DRAGON — VAPOK REALM v2026.1', 'cmd');
      output('======================================================================', 'warn');
      output(`Greetings warrior ${player.name}! The village of Oakhaven welcomes you.`, 'info');
      showTownMenu();
    }

    function showTownMenu() {
      state = 'town';
      output('', 'info');
      output('--- [ OAKHAVEN VILLAGE SQUARE ] ---', 'cmd');
      output(`[ Warrior: ${player.name} | Lvl: ${player.level} | HP: ${player.hp}/${player.maxHp} | Gold: ${player.gold} | Gems: ${player.gems} | Fights: ${player.forestFights} ]`, 'success');
      output('  [F] The Dark Forest        [T] Train with Master', 'info');
      output('  [W] Abdar\'s Weaponry       [A] Arthur\'s Armory', 'info');
      output('  [H] Village Healer         [I] The Red Boar Inn', 'info');
      output('  [S] Warrior Dossier        [D] Slay The RED DRAGON', 'info');
      output('  [Q] Return to BBS Main Menu', 'warn');
      setPrompt('OAKHAVEN [F,T,W,A,H,I,S,D,Q] >', '');
    }

    function handleInput(cmd) {
      const c = cmd.trim().toUpperCase();

      if (state === 'town') {
        switch (c) {
          case 'F':
            startForestEncounter();
            break;
          case 'T':
            startMasterTraining();
            break;
          case 'W':
            showWeaponShop();
            break;
          case 'A':
            showArmorShop();
            break;
          case 'H':
            visitHealer();
            break;
          case 'I':
            showInn();
            break;
          case 'S':
            showDossier();
            break;
          case 'D':
            startDragonBattle();
            break;
          case 'Q':
            save();
            output('You bid farewell to Oakhaven and step out of the tavern doors...', 'info');
            activeDoor = 'menu';
            showDoorsMenu();
            break;
          default:
            output('Invalid directive. Commands: F, T, W, A, H, I, S, D, Q', 'warn');
            setPrompt('OAKHAVEN [F,T,W,A,H,I,S,D,Q] >', '');
            break;
        }
      } else if (state === 'forest_combat' || state === 'master_combat' || state === 'dragon_combat') {
        handleCombatInput(c);
      } else if (state === 'weapons') {
        handleWeaponBuy(c);
      } else if (state === 'armor') {
        handleArmorBuy(c);
      } else if (state === 'inn') {
        handleInnInput(c);
      }
    }

    function startForestEncounter() {
      if (player.forestFights <= 0) {
        output('You have exhausted your forest stamina for today! Rest at the Inn or visit tomorrow.', 'warn');
        showTownMenu();
        return;
      }
      if (player.hp <= 0) {
        output('You are near death! Visit the [H]ealer before entering the dangerous forest.', 'error');
        showTownMenu();
        return;
      }

      player.forestFights--;
      save();

      const eligible = FOREST_MONSTERS.filter((m) => m.minLvl <= player.level);
      const template = eligible[Math.floor(Math.random() * eligible.length)] || FOREST_MONSTERS[0];

      currentEnemy = {
        name: template.name,
        hp: template.hp,
        maxHp: template.hp,
        atk: template.atk,
        gold: Math.floor(template.gold * (0.85 + Math.random() * 0.3)),
        exp: template.exp,
        isMaster: false,
        isDragon: false
      };

      state = 'forest_combat';
      output('', 'info');
      output(`>>> You delve into the mist and encounter a vicious ${currentEnemy.name}! <<<`, 'error');
      showCombatOptions();
    }

    function showCombatOptions() {
      output(`Enemy: [ ${currentEnemy.name} (HP: ${currentEnemy.hp}/${currentEnemy.maxHp}) ] vs [ ${player.name} (HP: ${player.hp}/${player.maxHp}) ]`, 'warn');
      setPrompt('COMBAT [A=Attack, S=Spell, R=Run] >', 'A, S, or R');
    }

    function handleCombatInput(c) {
      if (!currentEnemy) {
        showTownMenu();
        return;
      }

      const wpn = WEAPONS[player.weaponIdx];
      const arm = ARMORS[player.armorIdx];

      if (c === 'A' || c === 'S') {
        let playerDmg = Math.floor((player.level * 4 + wpn.power) * (0.8 + Math.random() * 0.4));
        if (c === 'S') {
          playerDmg = Math.floor(playerDmg * 1.35);
          output(`⚡ You channel mystical warrior energy!`, 'cmd');
        }

        const isCrit = Math.random() < 0.18;
        if (isCrit) {
          playerDmg = Math.floor(playerDmg * 1.6);
          output(`⚔️ CRITICAL STRIKE! You strike ${currentEnemy.name} for ${playerDmg} damage!`, 'success');
        } else {
          output(`You strike ${currentEnemy.name} with your ${wpn.name} for ${playerDmg} damage.`, 'info');
        }

        currentEnemy.hp -= playerDmg;

        if (currentEnemy.hp <= 0) {
          handleEnemyDefeated();
          return;
        }

        // Enemy Turn
        let enemyDmg = Math.max(1, Math.floor((currentEnemy.atk - arm.defense * 0.3) * (0.75 + Math.random() * 0.5)));
        output(`${currentEnemy.name} retaliates and deals ${enemyDmg} damage to you!`, 'error');
        player.hp = Math.max(0, player.hp - enemyDmg);
        save();

        if (player.hp <= 0) {
          output('☠️ YOU HAVE FALLEN IN BATTLE!', 'error');
          output('The village healer drags your unconscious body back to Oakhaven...', 'warn');
          player.hp = 1;
          player.gold = Math.floor(player.gold * 0.7);
          save();
          showTownMenu();
          return;
        }

        showCombatOptions();
      } else if (c === 'R') {
        if (currentEnemy.isDragon || currentEnemy.isMaster) {
          output('You cannot flee from this legendary duel!', 'error');
          showCombatOptions();
          return;
        }
        if (Math.random() < 0.65) {
          output('You successfully retreat through the thick brush back to village safety!', 'info');
          showTownMenu();
        } else {
          output(`You failed to flee! ${currentEnemy.name} strikes your back as you turn!`, 'error');
          const dmg = Math.max(2, Math.floor(currentEnemy.atk * 0.6));
          player.hp = Math.max(1, player.hp - dmg);
          save();
          showCombatOptions();
        }
      } else {
        showCombatOptions();
      }
    }

    function handleEnemyDefeated() {
      if (currentEnemy.isDragon) {
        player.dragonSlayer = true;
        player.gold += 10000;
        player.gems += 15;
        save();
        output('======================================================================', 'success');
        output('🎉 YOU HAVE SLAIN THE ANCIENT RED DRAGON! 🎉', 'success');
        output('The entire realm of Oakhaven celebrates your eternal name!', 'cmd');
        output('You gain 10,000 Gold and 15 Royal Gems!', 'success');
        output('======================================================================', 'success');
        showTownMenu();
        return;
      }

      if (currentEnemy.isMaster) {
        player.level++;
        player.maxHp += 20;
        player.hp = player.maxHp;
        player.exp = 0;
        player.expNext = Math.floor(player.expNext * 1.8);
        player.forestFights += 5;
        save();
        output('======================================================================', 'success');
        output(`🏆 YOU DEFEATED THE MASTER! Welcome to Level ${player.level}!`, 'success');
        output(`Max HP increased to ${player.maxHp}. Stamina replenished!`, 'info');
        output('======================================================================', 'success');
        showTownMenu();
        return;
      }

      player.gold += currentEnemy.gold;
      player.exp += currentEnemy.exp;
      const foundGem = Math.random() < 0.12;
      if (foundGem) {
        player.gems++;
      }

      output(`⚔️ Victory! You defeated the ${currentEnemy.name}!`, 'success');
      output(`Loot: +${currentEnemy.gold} Gold | +${currentEnemy.exp} EXP ${foundGem ? '| 💎 Found 1 Gem!' : ''}`, 'cmd');
      save();

      if (player.exp >= player.expNext) {
        output('✨ You feel immense power surging within you! Visit [T]rain with Master to level up!', 'warn');
      }

      showTownMenu();
    }

    function startMasterTraining() {
      if (player.exp < player.expNext) {
        output(`Master Torg: "You are not ready, student! You need ${player.expNext - player.exp} more EXP to challenge me."`, 'warn');
        showTownMenu();
        return;
      }

      currentEnemy = {
        name: `Master Torg [Rank ${player.level}]`,
        hp: player.maxHp + 15,
        maxHp: player.maxHp + 15,
        atk: Math.floor(player.level * 10 + 8),
        gold: 0,
        exp: 0,
        isMaster: true,
        isDragon: false
      };

      state = 'master_combat';
      output('', 'info');
      output(`>>> Master Torg draws his wooden staff: "Show me what you have learned!" <<<`, 'cmd');
      showCombatOptions();
    }

    function startDragonBattle() {
      if (player.level < 8) {
        output('The Red Dragon lair is far too deadly! You must be at least Level 8 to survive the volcanic ascent.', 'error');
        showTownMenu();
        return;
      }

      currentEnemy = {
        name: '🔥 ANCIENT RED DRAGON 🔥',
        hp: 650,
        maxHp: 650,
        atk: 95,
        gold: 10000,
        exp: 5000,
        isMaster: false,
        isDragon: true
      };

      state = 'dragon_combat';
      output('', 'info');
      output('======================================================================', 'error');
      output('>>> YOU ENTER THE VOLCANIC CRAG OF THE RED DRAGON! <<<', 'error');
      output('The massive beast opens its crimson eyes and unleashes an inferno roar!', 'warn');
      output('======================================================================', 'error');
      showCombatOptions();
    }

    function showWeaponShop() {
      state = 'weapons';
      output('', 'info');
      output('--- [ ABDAR\'S WEAPON EMPORIUM ] ---', 'cmd');
      output(`Current Gold: ${player.gold} | Equipped: ${WEAPONS[player.weaponIdx].name}`, 'info');
      WEAPONS.forEach((w, idx) => {
        const eq = idx === player.weaponIdx ? '[EQUIPPED]' : `[${w.cost} Gold]`;
        output(`  [${idx + 1}] ${w.name.padEnd(24)} (Power: +${w.power}) ${eq}`, 'success');
      });
      output('  [Q] Return to Village Square', 'warn');
      setPrompt('WEAPONS [1-9, Q] >', 'Select weapon # or Q');
    }

    function handleWeaponBuy(c) {
      if (c === 'Q') {
        showTownMenu();
        return;
      }
      const idx = parseInt(c, 10) - 1;
      if (idx >= 0 && idx < WEAPONS.length) {
        const item = WEAPONS[idx];
        if (idx === player.weaponIdx) {
          output('You already have this weapon equipped!', 'warn');
        } else if (player.gold < item.cost) {
          output(`You cannot afford the ${item.name}! (Need ${item.cost} Gold)`, 'error');
        } else {
          player.gold -= item.cost;
          player.weaponIdx = idx;
          save();
          output(`Equipped ${item.name}! Weapon power surged to +${item.power}.`, 'success');
        }
      }
      showWeaponShop();
    }

    function showArmorShop() {
      state = 'armor';
      output('', 'info');
      output('--- [ ARTHUR\'S ARMOR FORGE ] ---', 'cmd');
      output(`Current Gold: ${player.gold} | Equipped: ${ARMORS[player.armorIdx].name}`, 'info');
      ARMORS.forEach((a, idx) => {
        const eq = idx === player.armorIdx ? '[EQUIPPED]' : `[${a.cost} Gold]`;
        output(`  [${idx + 1}] ${a.name.padEnd(24)} (Defense: +${a.defense}) ${eq}`, 'success');
      });
      output('  [Q] Return to Village Square', 'warn');
      setPrompt('ARMOR [1-9, Q] >', 'Select armor # or Q');
    }

    function handleArmorBuy(c) {
      if (c === 'Q') {
        showTownMenu();
        return;
      }
      const idx = parseInt(c, 10) - 1;
      if (idx >= 0 && idx < ARMORS.length) {
        const item = ARMORS[idx];
        if (idx === player.armorIdx) {
          output('You already have this armor equipped!', 'warn');
        } else if (player.gold < item.cost) {
          output(`You cannot afford the ${item.name}! (Need ${item.cost} Gold)`, 'error');
        } else {
          player.gold -= item.cost;
          player.armorIdx = idx;
          save();
          output(`Donned ${item.name}! Defense rating increased to +${item.defense}.`, 'success');
        }
      }
      showArmorShop();
    }

    function visitHealer() {
      const missingHp = player.maxHp - player.hp;
      if (missingHp <= 0) {
        output('Healer Cedric: "You are already bursting with vitality, warrior!"', 'success');
        showTownMenu();
        return;
      }
      const cost = Math.max(5, Math.floor(missingHp * 1.5));
      if (player.gold < cost) {
        output(`Healer Cedric: "You need ${cost} Gold for healing herbs, but you only have ${player.gold}."`, 'error');
      } else {
        player.gold -= cost;
        player.hp = player.maxHp;
        save();
        output(`Cedric chants an ancient incantation. You are fully restored to ${player.maxHp} HP! (-${cost} Gold)`, 'success');
      }
      showTownMenu();
    }

    function showInn() {
      state = 'inn';
      output('', 'info');
      output('--- [ THE RED BOAR TAVERN & INN ] ---', 'cmd');
      output('The warm hearth crackles as bards sing of old dragon slayers.', 'info');
      output('  [1] Buy Ale & Listen for Rumors (10 Gold)', 'success');
      output('  [2] Flirt with Violet the Barmaid', 'cmd');
      output('  [3] Rest in Room (+5 Forest Fights, 50 Gold)', 'warn');
      output('  [Q] Leave Tavern', 'info');
      setPrompt('RED_BOAR_INN [1-3, Q] >', '');
    }

    function handleInnInput(c) {
      switch (c) {
        case '1':
          if (player.gold < 10) {
            output('Bartender: "No coin, no ale!"', 'error');
          } else {
            player.gold -= 10;
            save();
            const rumors = [
              'Bartender: "They say the Dragon is vulnerable after unleashing its fire breath!"',
              'Old Miner: "I saw gems gleaming deep in the mountain wyvern nests."',
              'Drunk Patron: "Abdar sells the Doom Blade, but only to those with deep pockets!"'
            ];
            output(rumors[Math.floor(Math.random() * rumors.length)], 'info');
          }
          break;
        case '2':
          if (Math.random() < 0.6) {
            output('Violet blushes and slips a lucky charm into your pocket! (+1 Stamina Fight)', 'success');
            player.forestFights++;
            save();
          } else {
            output('Violet winks: "Come back after you slay something bigger than a rat, hero!"', 'info');
          }
          break;
        case '3':
          if (player.gold < 50) {
            output('Innkeeper: "A warm bed costs 50 Gold!"', 'error');
          } else {
            player.gold -= 50;
            player.hp = player.maxHp;
            player.forestFights += 5;
            save();
            output('You sleep peacefully and wake feeling energized! (HP restored, +5 Forest Fights)', 'success');
          }
          break;
        case 'Q':
          showTownMenu();
          return;
      }
      showInn();
    }

    function showDossier() {
      output('', 'info');
      output('╔═══════════════════════════════════════════════════════════════════════════╗', 'cmd');
      output(`║                     WARRIOR DOSSIER: ${player.name.padEnd(36)} ║`, 'cmd');
      output('╠═══════════════════════════════════════════════════════════════════════════╣', 'cmd');
      output(`║ Level: ${player.level.toString().padEnd(12)} HP: ${`${player.hp}/${player.maxHp}`.padEnd(14)} Gold: ${player.gold.toString().padEnd(16)} ║`, 'info');
      output(`║ EXP: ${`${player.exp}/${player.expNext}`.padEnd(14)} Gems: ${player.gems.toString().padEnd(12)} Forest Fights: ${player.forestFights.toString().padEnd(8)} ║`, 'info');
      output(`║ Weapon: ${WEAPONS[player.weaponIdx].name.padEnd(20)} Armor: ${ARMORS[player.armorIdx].name.padEnd(23)} ║`, 'success');
      output(`║ Dragon Slayer Title: ${player.dragonSlayer ? '⭐ LEGENDARY DRAGON SLAYER ⭐' : 'Unaccomplished'}                    ║`, player.dragonSlayer ? 'success' : 'warn');
      output('╚═══════════════════════════════════════════════════════════════════════════╝', 'cmd');
      showTownMenu();
    }

    return {
      start,
      handleInput
    };
  })();

  /* ==========================================================================
     GAME 2: TRADEWARS 2002
     ========================================================================== */
  const TRADEWARS = (function () {
    const SECTORS = [
      { id: 1, name: 'Terra Central', warps: [2, 3, 4], port: { ore: { buy: 22, qty: 800 }, org: { sell: 45, qty: 500 }, eq: { buy: 140, qty: 200 } } },
      { id: 2, name: 'Alpha Centauri Hub', warps: [1, 5, 6], port: { ore: { sell: 55, qty: 400 }, org: { buy: 24, qty: 900 }, eq: { buy: 155, qty: 150 } } },
      { id: 3, name: 'Orion Mining Outpost', warps: [1, 7, 8], port: { ore: { sell: 18, qty: 1500 }, org: { buy: 65, qty: 200 }, eq: { sell: 180, qty: 80 } } },
      { id: 4, name: 'Rigel Agricultural Belt', warps: [1, 6, 9], port: { ore: { buy: 60, qty: 300 }, org: { sell: 16, qty: 1800 }, eq: { buy: 130, qty: 300 } } },
      { id: 5, name: 'Cygnus Tech Foundry', warps: [2, 7, 10], port: { ore: { buy: 70, qty: 400 }, org: { buy: 75, qty: 350 }, eq: { sell: 95, qty: 900 } } },
      { id: 6, name: 'Sirius Starport', warps: [2, 4, 8], port: { ore: { sell: 42, qty: 600 }, org: { sell: 38, qty: 700 }, eq: { buy: 165, qty: 250 } } },
      { id: 7, name: 'Pirate Haven (Black Market)', warps: [3, 5, 10], port: { ore: { sell: 65, qty: 500 }, org: { sell: 60, qty: 500 }, eq: { sell: 210, qty: 400 } } },
      { id: 8, name: 'Andromeda Gateway', warps: [3, 6, 9], port: { ore: { buy: 35, qty: 700 }, org: { buy: 30, qty: 800 }, eq: { buy: 110, qty: 500 } } },
      { id: 9, name: 'Nebula Extraction Zone', warps: [4, 8, 10], port: { ore: { sell: 20, qty: 1200 }, org: { buy: 55, qty: 400 }, eq: { buy: 175, qty: 180 } } },
      { id: 10, name: 'Galactic Core Station', warps: [5, 7, 9], port: { ore: { buy: 80, qty: 600 }, org: { buy: 85, qty: 600 }, eq: { sell: 105, qty: 1100 } } }
    ];

    const SHIPS = [
      { name: 'Merchant Cruiser', holds: 30, shields: 100, fighters: 10, cost: 0 },
      { name: 'Bulk Freighter', holds: 75, shields: 250, fighters: 25, cost: 8000 },
      { name: 'Battle Cruiser', holds: 120, shields: 500, fighters: 60, cost: 25000 },
      { name: 'Dreadnought Flagship', holds: 250, shields: 1200, fighters: 150, cost: 75000 }
    ];

    let player = null;
    let state = 'command'; // 'command', 'trade_buy', 'trade_sell', 'combat', 'shipyard'
    let currentPirate = null;

    function defaultPlayer() {
      return {
        credits: 1500,
        sector: 1,
        shipIdx: 0,
        holds: { ore: 0, org: 0, eq: 0 },
        fighters: 10,
        shields: 100,
        turns: 40
      };
    }

    function load() {
      try {
        const raw = localStorage.getItem('vapok_bbs_tw2002');
        player = raw ? JSON.parse(raw) : defaultPlayer();
      } catch (e) {
        player = defaultPlayer();
      }
      if (!player.turns && player.turns !== 0) player.turns = 40;
    }

    function save() {
      try {
        localStorage.setItem('vapok_bbs_tw2002', JSON.stringify(player));
      } catch (e) {}
    }

    function start() {
      load();
      state = 'command';
      output('======================================================================', 'warn');
      output('            TRADEWARS 2002 — VAPOK SECTOR FEDERATION', 'cmd');
      output('======================================================================', 'warn');
      output('Welcome Star Captain. Space commerce and tactical sector control active.', 'info');
      showSectorStatus();
    }

    function currentCargoUsed() {
      return player.holds.ore + player.holds.org + player.holds.eq;
    }

    function showSectorStatus() {
      state = 'command';
      const sec = SECTORS.find((s) => s.id === player.sector) || SECTORS[0];
      const ship = SHIPS[player.shipIdx];
      const cargoUsed = currentCargoUsed();

      output('', 'info');
      output(`--- [ SECTOR ${sec.id}: ${sec.name.toUpperCase()} ] ---`, 'cmd');
      output(`Ship: ${ship.name} | Credits: ${player.credits} CR | Shields: ${player.shields}/${ship.shields} | Fighters: ${player.fighters} | Turns: ${player.turns}`, 'success');
      output(`Cargo Holds: [ ${cargoUsed}/${ship.holds} Used ] (Ore: ${player.holds.ore} | Organics: ${player.holds.org} | Equip: ${player.holds.eq})`, 'info');
      output(`Warp Lanes to Sectors: [ ${sec.warps.join(', ')} ]`, 'cmd');
      output('Commands: [M]ove Sector | [P]ort Commerce | [U]pgrades / Shipyard | [I]nfo | [Q]uit', 'warn');
      setPrompt(`SECTOR_${sec.id} [M,P,U,I,Q] >`, '');
    }

    function handleInput(cmd) {
      const c = cmd.trim().toUpperCase();

      if (state === 'command') {
        switch (c) {
          case 'M':
            output(`Warp trajectory calculation active. Target sector [ ${getAdjacentSectors().join(', ')} ].`, 'cmd');
            setPrompt(`WARP [${getAdjacentSectors().join(',')}] >`, 'Enter sector #');
            state = 'warp_select';
            break;
          case 'P':
            showPortMenu();
            break;
          case 'U':
            showShipyard();
            break;
          case 'I':
            showFullInfo();
            break;
          case 'Q':
            save();
            output('Docking starship into starport hanger. Returning to BBS matrix...', 'info');
            activeDoor = 'menu';
            showDoorsMenu();
            break;
          default:
            output('Invalid command. Options: M (Move), P (Port), U (Upgrades), I (Info), Q (Quit)', 'warn');
            showSectorStatus();
            break;
        }
      } else if (state === 'warp_select') {
        handleWarpInput(c);
      } else if (state === 'port') {
        handlePortInput(c);
      } else if (state === 'shipyard') {
        handleShipyardInput(c);
      } else if (state === 'combat') {
        handleCombatInput(c);
      }
    }

    function getAdjacentSectors() {
      const sec = SECTORS.find((s) => s.id === player.sector);
      return sec ? sec.warps : [];
    }

    function handleWarpInput(c) {
      const targetSec = parseInt(c, 10);
      const warps = getAdjacentSectors();

      if (!warps.includes(targetSec)) {
        output(`Invalid warp destination! You can only jump to adjacent sectors: ${warps.join(', ')}`, 'error');
        showSectorStatus();
        return;
      }

      if (player.turns <= 0) {
        output('⚠️ Sublight fuel and hyperdrive turns depleted for this cycle!', 'error');
        showSectorStatus();
        return;
      }

      player.turns--;
      player.sector = targetSec;
      save();

      output(`Engaging hyperdrive... Warping to Sector ${targetSec}!`, 'success');

      // Random Pirate Encounter Chance
      if (Math.random() < 0.28 && targetSec !== 1) {
        startPirateEncounter();
      } else {
        showSectorStatus();
      }
    }

    function startPirateEncounter() {
      currentPirate = {
        name: 'Ferrengi Marauder Raiding Vessel',
        shields: 80 + player.sector * 20,
        fighters: 12 + player.sector * 4,
        bounty: 450 + player.sector * 120
      };

      state = 'combat';
      output('', 'info');
      output('⚠️ RED ALERT! SENSORS DETECT INCOMING HOSTILE VESSEL! ⚠️', 'error');
      output(`Encountered: [ ${currentPirate.name} (Shields: ${currentPirate.shields} | Fighters: ${currentPirate.fighters}) ]`, 'warn');
      setPrompt('TACTICAL [F=Fire Lasers, D=Deploy Fighters, E=Evasion] >', 'F, D, or E');
    }

    function handleCombatInput(c) {
      if (!currentPirate) {
        showSectorStatus();
        return;
      }

      const ship = SHIPS[player.shipIdx];

      if (c === 'F') {
        const playerLasers = Math.floor((25 + player.shipIdx * 20) * (0.8 + Math.random() * 0.5));
        output(`⚡ You fire tachyon pulse lasers for ${playerLasers} shield damage!`, 'cmd');
        currentPirate.shields -= playerLasers;

        if (currentPirate.shields <= 0) {
          handlePirateDestroyed();
          return;
        }

        // Pirate Counter-attack
        const pirateAtk = Math.floor(currentPirate.fighters * 2.2 * (0.7 + Math.random() * 0.5));
        player.shields = Math.max(0, player.shields - pirateAtk);
        output(`Hostile lasers pierce through and deal ${pirateAtk} damage to your shields!`, 'error');
        save();

        if (player.shields <= 0) {
          handlePlayerDestroyed();
          return;
        }

        output(`Current Shields: [ Yours: ${player.shields}/${ship.shields} ] | [ Pirate: ${Math.max(0, currentPirate.shields)} ]`, 'warn');
        setPrompt('TACTICAL [F=Fire Lasers, D=Deploy Fighters, E=Evasion] >', 'F, D, or E');
      } else if (c === 'D') {
        if (player.fighters <= 0) {
          output('No combat fighters remaining in launch bays!', 'error');
          setPrompt('TACTICAL [F=Fire Lasers, D=Deploy Fighters, E=Evasion] >', 'F, D, or E');
          return;
        }
        const fighterLoss = Math.min(player.fighters, Math.floor(1 + Math.random() * 3));
        const pirateLoss = Math.min(currentPirate.fighters, Math.floor(2 + Math.random() * 4));
        player.fighters -= fighterLoss;
        currentPirate.fighters -= pirateLoss;
        currentPirate.shields -= pirateLoss * 15;
        output(`Dogfight in open space! Lost ${fighterLoss} fighters; eliminated ${pirateLoss} pirate drones!`, 'warn');

        if (currentPirate.shields <= 0 || currentPirate.fighters <= 0) {
          handlePirateDestroyed();
          return;
        }
        setPrompt('TACTICAL [F=Fire Lasers, D=Deploy Fighters, E=Evasion] >', 'F, D, or E');
      } else if (c === 'E') {
        if (Math.random() < 0.6) {
          output('Evasive emergency burn successful! Escaped hostile fire cone.', 'success');
          showSectorStatus();
        } else {
          output('Evasive maneuvers failed! Hostile fighters strafe your engines (-25 Shields)!', 'error');
          player.shields = Math.max(0, player.shields - 25);
          if (player.shields <= 0) handlePlayerDestroyed();
          else setPrompt('TACTICAL [F=Fire Lasers, D=Deploy Fighters, E=Evasion] >', 'F, D, or E');
        }
      } else {
        setPrompt('TACTICAL [F=Fire Lasers, D=Deploy Fighters, E=Evasion] >', 'F, D, or E');
      }
    }

    function handlePirateDestroyed() {
      player.credits += currentPirate.bounty;
      output('======================================================================', 'success');
      output(`💥 TARGET DESTROYED! Federation bounty awarded: +${currentPirate.bounty} Credits!`, 'success');
      output('======================================================================', 'success');
      currentPirate = null;
      save();
      showSectorStatus();
    }

    function handlePlayerDestroyed() {
      output('======================================================================', 'error');
      output('💥 CRITICAL HULL BREACH! STARSHIP DESTROYED! 💥', 'error');
      output('Emergency escape pod retrieved by Federation patrol. Cargo lost.', 'warn');
      output('======================================================================', 'error');
      player.holds = { ore: 0, org: 0, eq: 0 };
      player.shields = 50;
      player.fighters = 5;
      player.credits = Math.max(100, Math.floor(player.credits * 0.5));
      player.sector = 1;
      currentPirate = null;
      save();
      showSectorStatus();
    }

    function showPortMenu() {
      state = 'port';
      const sec = SECTORS.find((s) => s.id === player.sector);
      if (!sec) return;

      const ship = SHIPS[player.shipIdx];
      const availHolds = ship.holds - currentCargoUsed();

      output('', 'info');
      output(`--- [ PORT COMMERCE // SECTOR ${sec.id}: ${sec.name} ] ---`, 'cmd');
      output(`Credits: ${player.credits} CR | Free Holds: ${availHolds}`, 'info');
      output(`  [1] Buy Fuel Ore        (${sec.port.ore.sell ? `Cost: ${sec.port.ore.sell} CR` : 'Not Selling'})`, 'success');
      output(`  [2] Sell Fuel Ore       (${sec.port.ore.buy ? `Pays: ${sec.port.ore.buy} CR` : 'Not Buying'})`, 'info');
      output(`  [3] Buy Organics        (${sec.port.org.sell ? `Cost: ${sec.port.org.sell} CR` : 'Not Selling'})`, 'success');
      output(`  [4] Sell Organics       (${sec.port.org.buy ? `Pays: ${sec.port.org.buy} CR` : 'Not Buying'})`, 'info');
      output(`  [5] Buy Equipment       (${sec.port.eq.sell ? `Cost: ${sec.port.eq.sell} CR` : 'Not Selling'})`, 'success');
      output(`  [6] Sell Equipment      (${sec.port.eq.buy ? `Pays: ${sec.port.eq.buy} CR` : 'Not Buying'})`, 'info');
      output('  [Q] Exit Port to Star System', 'warn');
      setPrompt('PORT_COMMERCE [1-6, Q] >', 'Select action # or Q');
    }

    function handlePortInput(c) {
      const sec = SECTORS.find((s) => s.id === player.sector);
      const ship = SHIPS[player.shipIdx];
      const freeHolds = ship.holds - currentCargoUsed();

      switch (c) {
        case '1': // Buy Ore
          if (!sec.port.ore.sell) {
            output('This port does not export Fuel Ore!', 'warn');
          } else if (freeHolds <= 0) {
            output('No free cargo holds available!', 'error');
          } else {
            const maxBuy = Math.min(freeHolds, Math.floor(player.credits / sec.port.ore.sell), 10);
            if (maxBuy <= 0) {
              output('Insufficient credits to purchase Fuel Ore!', 'error');
            } else {
              const cost = maxBuy * sec.port.ore.sell;
              player.credits -= cost;
              player.holds.ore += maxBuy;
              save();
              output(`Purchased ${maxBuy} units of Fuel Ore for ${cost} Credits.`, 'success');
            }
          }
          break;
        case '2': // Sell Ore
          if (player.holds.ore <= 0) {
            output('You have no Fuel Ore in cargo holds!', 'warn');
          } else if (!sec.port.ore.buy) {
            output('This port is not buying Fuel Ore!', 'warn');
          } else {
            const revenue = player.holds.ore * sec.port.ore.buy;
            output(`Sold all ${player.holds.ore} units of Fuel Ore for +${revenue} Credits!`, 'success');
            player.credits += revenue;
            player.holds.ore = 0;
            save();
          }
          break;
        case '3': // Buy Organics
          if (!sec.port.org.sell) {
            output('This port does not export Organics!', 'warn');
          } else if (freeHolds <= 0) {
            output('No free cargo holds available!', 'error');
          } else {
            const maxBuy = Math.min(freeHolds, Math.floor(player.credits / sec.port.org.sell), 10);
            if (maxBuy <= 0) {
              output('Insufficient credits to purchase Organics!', 'error');
            } else {
              const cost = maxBuy * sec.port.org.sell;
              player.credits -= cost;
              player.holds.org += maxBuy;
              save();
              output(`Purchased ${maxBuy} units of Organics for ${cost} Credits.`, 'success');
            }
          }
          break;
        case '4': // Sell Organics
          if (player.holds.org <= 0) {
            output('You have no Organics in cargo holds!', 'warn');
          } else if (!sec.port.org.buy) {
            output('This port is not buying Organics!', 'warn');
          } else {
            const revenue = player.holds.org * sec.port.org.buy;
            output(`Sold all ${player.holds.org} units of Organics for +${revenue} Credits!`, 'success');
            player.credits += revenue;
            player.holds.org = 0;
            save();
          }
          break;
        case '5': // Buy Equipment
          if (!sec.port.eq.sell) {
            output('This port does not export Equipment!', 'warn');
          } else if (freeHolds <= 0) {
            output('No free cargo holds available!', 'error');
          } else {
            const maxBuy = Math.min(freeHolds, Math.floor(player.credits / sec.port.eq.sell), 5);
            if (maxBuy <= 0) {
              output('Insufficient credits to purchase Equipment!', 'error');
            } else {
              const cost = maxBuy * sec.port.eq.sell;
              player.credits -= cost;
              player.holds.eq += maxBuy;
              save();
              output(`Purchased ${maxBuy} units of High-Tech Equipment for ${cost} Credits.`, 'success');
            }
          }
          break;
        case '6': // Sell Equipment
          if (player.holds.eq <= 0) {
            output('You have no Equipment in cargo holds!', 'warn');
          } else if (!sec.port.eq.buy) {
            output('This port is not buying Equipment!', 'warn');
          } else {
            const revenue = player.holds.eq * sec.port.eq.buy;
            output(`Sold all ${player.holds.eq} units of Equipment for +${revenue} Credits!`, 'success');
            player.credits += revenue;
            player.holds.eq = 0;
            save();
          }
          break;
        case 'Q':
          showSectorStatus();
          return;
      }
      showPortMenu();
    }

    function showShipyard() {
      state = 'shipyard';
      const ship = SHIPS[player.shipIdx];
      output('', 'info');
      output('--- [ FEDERATION SHIPYARD & REPAIR DOCKS ] ---', 'cmd');
      output(`Current Vessel: ${ship.name} | Credits: ${player.credits} CR`, 'info');
      output('  [1] Recharge Shield Capacitors to MAX (100 Credits)', 'success');
      output('  [2] Purchase 5 Combat Fighters (250 Credits)', 'success');
      SHIPS.forEach((s, idx) => {
        if (idx > player.shipIdx) {
          output(`  [${idx + 2}] Upgrade to ${s.name} (${s.cost} CR, Holds: ${s.holds}, Shields: ${s.shields})`, 'cmd');
        }
      });
      output('  [Q] Return to Sector View', 'warn');
      setPrompt('SHIPYARD [1-5, Q] >', 'Select service # or Q');
    }

    function handleShipyardInput(c) {
      const ship = SHIPS[player.shipIdx];
      switch (c) {
        case '1':
          if (player.credits < 100) {
            output('Insufficient credits for shield recharge!', 'error');
          } else {
            player.credits -= 100;
            player.shields = ship.shields;
            save();
            output(`Shield capacitors fully recharged to ${ship.shields}!`, 'success');
          }
          break;
        case '2':
          if (player.credits < 250) {
            output('Insufficient credits for combat fighters!', 'error');
          } else if (player.fighters >= ship.fighters) {
            output('Fighter bays are currently at maximum capacity!', 'warn');
          } else {
            player.credits -= 250;
            player.fighters = Math.min(ship.fighters, player.fighters + 5);
            save();
            output(`Loaded 5 combat fighters into launch tubes. Total: ${player.fighters}.`, 'success');
          }
          break;
        case '3':
        case '4':
        case '5':
          const targetIdx = parseInt(c, 10) - 2;
          if (targetIdx > player.shipIdx && targetIdx < SHIPS.length) {
            const nextShip = SHIPS[targetIdx];
            if (player.credits < nextShip.cost) {
              output(`Insufficient credits for ${nextShip.name}! (Need ${nextShip.cost} CR)`, 'error');
            } else {
              player.credits -= nextShip.cost;
              player.shipIdx = targetIdx;
              player.shields = nextShip.shields;
              player.fighters = nextShip.fighters;
              save();
              output(`🚀 UPGRADE COMPLETE! You now command the ${nextShip.name}!`, 'success');
            }
          }
          break;
        case 'Q':
          showSectorStatus();
          return;
      }
      showShipyard();
    }

    function showFullInfo() {
      const ship = SHIPS[player.shipIdx];
      output('', 'info');
      output('╔═══════════════════════════════════════════════════════════════════════════╗', 'cmd');
      output(`║                  FEDERATION TRADEWARS LOGBOOK                             ║`, 'cmd');
      output('╠═══════════════════════════════════════════════════════════════════════════╣', 'cmd');
      output(`║ Vessel: ${ship.name.padEnd(20)} Current Sector: ${player.sector.toString().padEnd(14)} Turns: ${player.turns.toString().padEnd(8)} ║`, 'info');
      output(`║ Credits: ${`${player.credits} CR`.padEnd(18)} Shields: ${`${player.shields}/${ship.shields}`.padEnd(16)} Fighters: ${player.fighters.toString().padEnd(5)} ║`, 'info');
      output(`║ Holds: Ore(${player.holds.ore}) | Organics(${player.holds.org}) | Equipment(${player.holds.eq}) / Max: ${ship.holds}           ║`, 'success');
      output('╚═══════════════════════════════════════════════════════════════════════════╝', 'cmd');
      showSectorStatus();
    }

    return {
      start,
      handleInput
    };
  })();

  /* ==========================================================================
     GAME 3: BARREN REALMS ELITE (BRE)
     ========================================================================== */
  const BRE = (function () {
    const RIVALS = [
      { name: 'Baron Von Klaus (Cyber-Prussia)', land: 850, military: 180, credits: 4000 },
      { name: 'Empress Vex (Neo-Solaris)', land: 1200, military: 320, credits: 7500 },
      { name: 'Warlord Kael (Titan Foundry)', land: 1800, military: 550, credits: 14000 }
    ];

    let barony = null;
    let state = 'domain'; // 'domain', 'build', 'military', 'attack', 'espionage'

    function defaultBarony() {
      return {
        name: 'Vapok Sovereignty',
        year: 2026,
        credits: 5000,
        population: 600,
        food: 2000,
        land: 500,
        taxRate: 15,
        infantry: 50,
        tanks: 10,
        jets: 5,
        turrets: 8,
        techLevel: 1
      };
    }

    function load() {
      try {
        const raw = localStorage.getItem('vapok_bbs_bre');
        barony = raw ? JSON.parse(raw) : defaultBarony();
      } catch (e) {
        barony = defaultBarony();
      }
    }

    function save() {
      try {
        localStorage.setItem('vapok_bbs_bre', JSON.stringify(barony));
      } catch (e) {}
    }

    function start() {
      load();
      state = 'domain';
      output('======================================================================', 'warn');
      output('           BARREN REALMS ELITE — PLANETARY STRATEGY', 'cmd');
      output('======================================================================', 'warn');
      output(`Lord Commander, the realm of ${barony.name} awaits your executive directives.`, 'info');
      showDomainOverview();
    }

    function showDomainOverview() {
      state = 'domain';
      output('', 'info');
      output(`--- [ DOMAIN OF ${barony.name.toUpperCase()} // YEAR ${barony.year} ] ---`, 'cmd');
      output(`Credits: ${barony.credits} Solar CR | Land: ${barony.land} Acres | Population: ${barony.population} Citizens | Food: ${barony.food} Bushels`, 'success');
      output(`Military Strength: [ ${barony.infantry} Cyber-Infantry | ${barony.tanks} Heavy Tanks | ${barony.jets} Orbital Jets | ${barony.turrets} Turrets ]`, 'info');
      output(`Tax Rate: ${barony.taxRate}% | Tech Level: ${barony.techLevel}`, 'cmd');
      output('Directives: [N]ext Year Turn | [B]uildings & Land | [M]ilitary Recruitment | [W]ar & Conquest | [E]spionage | [Q]uit', 'warn');
      setPrompt(`DOMAIN_${barony.year} [N,B,M,W,E,Q] >`, '');
    }

    function handleInput(cmd) {
      const c = cmd.trim().toUpperCase();

      if (state === 'domain') {
        switch (c) {
          case 'N':
            runNextTurn();
            break;
          case 'B':
            showBuildMenu();
            break;
          case 'M':
            showMilitaryMenu();
            break;
          case 'W':
            showWarMenu();
            break;
          case 'E':
            showEspionageMenu();
            break;
          case 'Q':
            save();
            output('Sealing sovereign domain archives. Returning to BBS door matrix...', 'info');
            activeDoor = 'menu';
            showDoorsMenu();
            break;
          default:
            output('Invalid directive. Commands: N (Next Year), B (Build), M (Military), W (War), E (Espionage), Q (Quit)', 'warn');
            setPrompt(`DOMAIN_${barony.year} [N,B,M,W,E,Q] >`, '');
            break;
        }
      } else if (state === 'build') {
        handleBuildInput(c);
      } else if (state === 'military') {
        handleMilitaryInput(c);
      } else if (state === 'attack') {
        handleAttackInput(c);
      } else if (state === 'espionage') {
        handleEspionageInput(c);
      }
    }

    function runNextTurn() {
      barony.year++;

      // Food harvest & consumption
      const harvest = Math.floor(barony.land * (2.5 + Math.random() * 1.5) * barony.techLevel);
      const foodNeeded = barony.population * 3;
      barony.food = barony.food + harvest - foodNeeded;

      // Tax revenue
      const revenue = Math.floor(barony.population * (barony.taxRate * 0.45));
      barony.credits += revenue;

      output('======================================================================', 'cmd');
      output(`>>> ANNUAL CYCLE REPORT FOR YEAR ${barony.year} <<<`, 'cmd');
      output(`🌾 Harvest: +${harvest} Food Bushels | Citizens Consumed: -${foodNeeded} Food`, 'info');
      output(`💰 Solar Tax Revenue Collected: +${revenue} Credits`, 'success');

      // Famine / Population Growth
      if (barony.food < 0) {
        const starved = Math.min(barony.population, Math.floor(Math.abs(barony.food) / 4));
        barony.population -= starved;
        barony.food = 0;
        output(`⚠️ FAMINE IN THE REALM! ${starved} citizens starved due to food deficit!`, 'error');
      } else {
        const newborn = Math.floor(barony.population * 0.08);
        barony.population += newborn;
        output(`✨ Population grew by +${newborn} new citizens.`, 'info');
      }

      save();
      showDomainOverview();
    }

    function showBuildMenu() {
      state = 'build';
      output('', 'info');
      output('--- [ INFRASTRUCTURE & LAND EXPANSION ] ---', 'cmd');
      output(`Credits: ${barony.credits} CR | Land: ${barony.land} Acres`, 'info');
      output('  [1] Buy 50 Acres of Land (500 Credits)', 'success');
      output('  [2] Erect Defense Turret (300 Credits)', 'success');
      output('  [3] Research Cyber Tech Level Upgrade (2,500 Credits)', 'warn');
      output('  [4] Adjust Tax Rate (Currently: ' + barony.taxRate + '%)', 'cmd');
      output('  [Q] Return to Domain Command', 'info');
      setPrompt('BUILD_LAND [1-4, Q] >', 'Select option # or Q');
    }

    function handleBuildInput(c) {
      switch (c) {
        case '1':
          if (barony.credits < 500) {
            output('Insufficient credits to annex land!', 'error');
          } else {
            barony.credits -= 500;
            barony.land += 50;
            save();
            output('Annexed +50 acres of arable domain land!', 'success');
          }
          break;
        case '2':
          if (barony.credits < 300) {
            output('Insufficient credits for defense turret!', 'error');
          } else {
            barony.credits -= 300;
            barony.turrets++;
            save();
            output(`Constructed Heavy Defense Turret. Total: ${barony.turrets}.`, 'success');
          }
          break;
        case '3':
          const cost = barony.techLevel * 2500;
          if (barony.credits < cost) {
            output(`Insufficient credits for Tech Upgrade! (Need ${cost} Credits)`, 'error');
          } else {
            barony.credits -= cost;
            barony.techLevel++;
            save();
            output(`🔬 TECH RESEARCH ADVANCED! Sovereignty now at Tech Level ${barony.techLevel}!`, 'success');
          }
          break;
        case '4':
          barony.taxRate = (barony.taxRate + 5) > 30 ? 10 : barony.taxRate + 5;
          save();
          output(`Tax rate adjusted to ${barony.taxRate}%.`, 'info');
          break;
        case 'Q':
          showDomainOverview();
          return;
      }
      showBuildMenu();
    }

    function showMilitaryMenu() {
      state = 'military';
      output('', 'info');
      output('--- [ WAR FOUNDRY & RECRUITMENT ] ---', 'cmd');
      output(`Available Credits: ${barony.credits} CR`, 'info');
      output('  [1] Train 25 Cyber-Infantry (250 Credits)', 'success');
      output('  [2] Build 5 Heavy Cyber-Tanks (500 Credits)', 'success');
      output('  [3] Construct 2 Orbital Strike Jets (600 Credits)', 'success');
      output('  [Q] Return to Domain Command', 'warn');
      setPrompt('RECRUIT [1-3, Q] >', 'Select unit # or Q');
    }

    function handleMilitaryInput(c) {
      switch (c) {
        case '1':
          if (barony.credits < 250) {
            output('Insufficient credits for infantry training!', 'error');
          } else {
            barony.credits -= 250;
            barony.infantry += 25;
            save();
            output(`Trained +25 Cyber-Infantry divisions. Total: ${barony.infantry}.`, 'success');
          }
          break;
        case '2':
          if (barony.credits < 500) {
            output('Insufficient credits for Cyber-Tanks!', 'error');
          } else {
            barony.credits -= 500;
            barony.tanks += 5;
            save();
            output(`Manufactured +5 Heavy Tanks. Total: ${barony.tanks}.`, 'success');
          }
          break;
        case '3':
          if (barony.credits < 600) {
            output('Insufficient credits for Orbital Jets!', 'error');
          } else {
            barony.credits -= 600;
            barony.jets += 2;
            save();
            output(`Deployed +2 Orbital Strike Jets. Total: ${barony.jets}.`, 'success');
          }
          break;
        case 'Q':
          showDomainOverview();
          return;
      }
      showMilitaryMenu();
    }

    function showWarMenu() {
      state = 'attack';
      output('', 'info');
      output('--- [ PLANETARY WAR MAP & CONQUEST ] ---', 'cmd');
      RIVALS.forEach((r, idx) => {
        output(`  [${idx + 1}] Invade ${r.name.padEnd(32)} (Land: ${r.land} Acres | Def: ~${r.military})`, 'error');
      });
      output('  [Q] Abort Military Assault', 'warn');
      setPrompt('WAR_TARGET [1-3, Q] >', 'Select target # or Q');
    }

    function handleAttackInput(c) {
      if (c === 'Q') {
        showDomainOverview();
        return;
      }
      const idx = parseInt(c, 10) - 1;
      if (idx >= 0 && idx < RIVALS.length) {
        const target = RIVALS[idx];
        const playerPower = barony.infantry * 1 + barony.tanks * 6 + barony.jets * 15;
        if (playerPower < 30) {
          output('Your military strength is too weak to launch an invasion!', 'error');
          showDomainOverview();
          return;
        }

        output(`>>> LAUNCHING ASSAULT ON ${target.name.toUpperCase()} <<<`, 'warn');
        const roll = Math.random();
        if (playerPower > target.military * (0.8 + roll * 0.4)) {
          const landWon = Math.floor(target.land * 0.25);
          const loot = Math.floor(target.credits * 0.3);
          barony.land += landWon;
          barony.credits += loot;
          barony.infantry = Math.floor(barony.infantry * 0.85);
          barony.tanks = Math.floor(barony.tanks * 0.85);
          save();
          output('======================================================================', 'success');
          output(`🏆 DECISIVE CONQUEST! You crushed the defenses of ${target.name}!`, 'success');
          output(`Annexed +${landWon} Acres of Land! Plundered +${loot} Solar Credits!`, 'cmd');
          output('======================================================================', 'success');
        } else {
          output(`Assault repelled by heavy fortifications! Sustained heavy unit casualties.`, 'error');
          barony.infantry = Math.floor(barony.infantry * 0.6);
          barony.tanks = Math.floor(barony.tanks * 0.6);
          save();
        }
        showDomainOverview();
      }
    }

    function showEspionageMenu() {
      state = 'espionage';
      output('', 'info');
      output('--- [ CYBER-ESPIONAGE & PROBE SENSORS ] ---', 'cmd');
      output('  [1] Launch Orbital Recon Satellite on Klaus (150 Credits)', 'info');
      output('  [2] Infiltrate Neo-Solaris Power Grids (350 Credits)', 'info');
      output('  [3] Sabotage Titan Foundry Cyber-Tanks (600 Credits)', 'warn');
      output('  [Q] Return to Domain Command', 'cmd');
      setPrompt('ESPIONAGE [1-3, Q] >', 'Select mission # or Q');
    }

    function handleEspionageInput(c) {
      switch (c) {
        case '1':
          if (barony.credits < 150) {
            output('Insufficient credits for recon satellite!', 'error');
          } else {
            barony.credits -= 150;
            save();
            output(`🛰️ Recon Report: Baron Klaus has ${RIVALS[0].military} active divisions and ${RIVALS[0].land} acres.`, 'success');
          }
          break;
        case '2':
          if (barony.credits < 350) {
            output('Insufficient credits for grid infiltration!', 'error');
          } else {
            barony.credits -= 350;
            const stolen = Math.floor(200 + Math.random() * 400);
            barony.credits += stolen;
            save();
            output(`⚡ Cyber-Grid Siphoned! Extracted +${stolen} Solar Credits from Solaris!`, 'success');
          }
          break;
        case '3':
          if (barony.credits < 600) {
            output('Insufficient credits for sabotage operation!', 'error');
          } else {
            barony.credits -= 600;
            RIVALS[2].military = Math.max(100, RIVALS[2].military - 80);
            save();
            output(`💥 Sabotage successful! Titan Foundry lost 80 armored divisions!`, 'success');
          }
          break;
        case 'Q':
          showDomainOverview();
          return;
      }
      showEspionageMenu();
    }

    return {
      start,
      handleInput
    };
  })();

  /* ==========================================================================
     MAIN BBS ROUTER
     ========================================================================== */
  function openDoor(doorName) {
    if (!isDesktop()) {
      output('// NOTICE: BBS Door games require a desktop terminal viewport.', 'warn');
      resetToDefaultPrompt();
      return;
    }

    const name = (doorName || '').trim().toLowerCase();
    if (name === '1' || name === 'lord' || name === 'reddragon' || name === 'dragon') {
      activeDoor = 'lord';
      LORD.start();
    } else if (name === '2' || name === 'tradewars' || name === 'tw2002' || name === 'tw') {
      activeDoor = 'tradewars';
      TRADEWARS.start();
    } else if (name === '3' || name === 'bre' || name === 'barren' || name === 'barrenrealms') {
      activeDoor = 'bre';
      BRE.start();
    } else if (name === 'q' || name === 'exit' || name === 'quit') {
      activeDoor = null;
      output('// Exited BBS Door matrix. Returning to Vapok Mainframe Prompt.', 'info');
      resetToDefaultPrompt();
    } else {
      showDoorsMenu();
    }
  }

  function handleInput(rawCmd) {
    if (!activeDoor) return false;

    if (activeDoor === 'menu') {
      openDoor(rawCmd);
      return true;
    } else if (activeDoor === 'lord') {
      LORD.handleInput(rawCmd);
      return true;
    } else if (activeDoor === 'tradewars') {
      TRADEWARS.handleInput(rawCmd);
      return true;
    } else if (activeDoor === 'bre') {
      BRE.handleInput(rawCmd);
      return true;
    }

    return false;
  }

  function isDoorActive() {
    return activeDoor !== null;
  }

  return {
    setPrintFunction,
    setPromptFunction,
    showDoorsMenu,
    openDoor,
    handleInput,
    isDoorActive
  };
})();
