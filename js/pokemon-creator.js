/**
 * PKM-Universe Advanced Pokemon Creator
 * Full-featured Pokemon customization with tabbed interface
 * Similar to GenPKM but with unique PKM-Universe styling
 */

class PokemonCreator {
    constructor() {
        this.pokemon = {
            species: '',
            speciesId: 0,
            nickname: '',
            game: 'sv',
            level: 100,
            shiny: false,
            gender: 'random',
            heldItem: '',
            pokeball: 'Poke Ball',
            nature: 'Hardy',
            ability: '',
            abilityIndex: 0,
            teraType: '',
            gigantamax: false,
            alpha: false,
            form: 0,
            ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
            hyperTrained: { hp: false, atk: false, def: false, spa: false, spd: false, spe: false },
            moves: ['', '', '', ''],
            friendship: 255,
            dynamaxLevel: 10,
            scale: 128,
            ribbons: [],
            marks: [],
            ot: {
                name: 'PKM-Universe',
                tid: '000000',
                sid: '0000',
                gender: 'Male',
                language: 'ENG'
            },
            metLocation: '',
            metLevel: 1,
            metDate: new Date().toISOString().split('T')[0]
        };

        this.baseStats = {};
        this.abilities = [];
        this.moves = [];
        this.forms = [];
        this.currentTab = 'basics';

        this.games = {
            'za': { name: 'Legends: Z-A', gen: 9 },
            'sv': { name: 'Scarlet/Violet', gen: 9 },
            'pla': { name: 'Legends: Arceus', gen: 8 },
            'bdsp': { name: 'Brilliant Diamond/Shining Pearl', gen: 8 },
            'swsh': { name: 'Sword/Shield', gen: 8 },
            'lgpe': { name: "Let's Go Pikachu/Eevee", gen: 7 }
        };

        this.natures = [
            'Hardy', 'Lonely', 'Brave', 'Adamant', 'Naughty',
            'Bold', 'Docile', 'Relaxed', 'Impish', 'Lax',
            'Timid', 'Hasty', 'Serious', 'Jolly', 'Naive',
            'Modest', 'Mild', 'Quiet', 'Bashful', 'Rash',
            'Calm', 'Gentle', 'Sassy', 'Careful', 'Quirky'
        ];

        this.natureEffects = {
            'Hardy': { plus: null, minus: null },
            'Lonely': { plus: 'atk', minus: 'def' },
            'Brave': { plus: 'atk', minus: 'spe' },
            'Adamant': { plus: 'atk', minus: 'spa' },
            'Naughty': { plus: 'atk', minus: 'spd' },
            'Bold': { plus: 'def', minus: 'atk' },
            'Docile': { plus: null, minus: null },
            'Relaxed': { plus: 'def', minus: 'spe' },
            'Impish': { plus: 'def', minus: 'spa' },
            'Lax': { plus: 'def', minus: 'spd' },
            'Timid': { plus: 'spe', minus: 'atk' },
            'Hasty': { plus: 'spe', minus: 'def' },
            'Serious': { plus: null, minus: null },
            'Jolly': { plus: 'spe', minus: 'spa' },
            'Naive': { plus: 'spe', minus: 'spd' },
            'Modest': { plus: 'spa', minus: 'atk' },
            'Mild': { plus: 'spa', minus: 'def' },
            'Quiet': { plus: 'spa', minus: 'spe' },
            'Bashful': { plus: null, minus: null },
            'Rash': { plus: 'spa', minus: 'spd' },
            'Calm': { plus: 'spd', minus: 'atk' },
            'Gentle': { plus: 'spd', minus: 'def' },
            'Sassy': { plus: 'spd', minus: 'spe' },
            'Careful': { plus: 'spd', minus: 'spa' },
            'Quirky': { plus: null, minus: null }
        };

        this.teraTypes = [
            'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice',
            'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
            'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy', 'Stellar'
        ];

        this.pokeballs = [
            'Poke Ball', 'Great Ball', 'Ultra Ball', 'Master Ball',
            'Safari Ball', 'Sport Ball', 'Level Ball', 'Lure Ball',
            'Moon Ball', 'Friend Ball', 'Love Ball', 'Heavy Ball',
            'Fast Ball', 'Premier Ball', 'Repeat Ball', 'Timer Ball',
            'Nest Ball', 'Net Ball', 'Dive Ball', 'Luxury Ball',
            'Heal Ball', 'Quick Ball', 'Dusk Ball', 'Cherish Ball',
            'Dream Ball', 'Beast Ball', 'Strange Ball', 'Hisuian Poke',
            'Hisuian Great', 'Hisuian Ultra', 'Feather Ball', 'Wing Ball',
            'Jet Ball', 'Hisuian Heavy', 'Leaden Ball', 'Gigaton Ball',
            'Origin Ball'
        ];

        this.languages = [
            { code: 'ENG', name: 'English' },
            { code: 'JPN', name: 'Japanese' },
            { code: 'FRE', name: 'French' },
            { code: 'GER', name: 'German' },
            { code: 'SPA', name: 'Spanish' },
            { code: 'ITA', name: 'Italian' },
            { code: 'KOR', name: 'Korean' },
            { code: 'CHS', name: 'Chinese (Simplified)' },
            { code: 'CHT', name: 'Chinese (Traditional)' }
        ];

        this.popularItems = [
            'None', 'Choice Band', 'Choice Specs', 'Choice Scarf',
            'Life Orb', 'Leftovers', 'Rocky Helmet', 'Focus Sash',
            'Assault Vest', 'Heavy-Duty Boots', 'Eviolite', 'Black Sludge',
            'Sitrus Berry', 'Lum Berry', 'Expert Belt', 'Weakness Policy',
            'Air Balloon', 'Loaded Dice', 'Booster Energy', 'Clear Amulet',
            'Covert Cloak', 'Mirror Herb', 'Ability Shield', 'Flame Orb',
            'Toxic Orb', 'Light Clay', 'Metronome', 'Wide Lens',
            'Scope Lens', 'Razor Claw', 'Safety Goggles', 'Protective Pads',
            'Shell Bell', 'Black Belt', 'Charcoal', 'Mystic Water',
            'Miracle Seed', 'Never-Melt Ice', 'Soft Sand', 'Sharp Beak',
            'Twisted Spoon', 'Silver Powder', 'Hard Stone', 'Spell Tag',
            'Dragon Fang', 'Black Glasses', 'Metal Coat', 'Silk Scarf'
        ];

        this.ribbons = [
            'Champion Ribbon', 'Tower Master Ribbon', 'Great Ability Ribbon',
            'Double Ability Ribbon', 'Multi Ability Ribbon', 'Pair Ability Ribbon',
            'World Ability Ribbon', 'Alert Ribbon', 'Shock Ribbon', 'Downcast Ribbon',
            'Careless Ribbon', 'Relax Ribbon', 'Snooze Ribbon', 'Smile Ribbon',
            'Gorgeous Ribbon', 'Royal Ribbon', 'Gorgeous Royal Ribbon', 'Footprint Ribbon',
            'Record Ribbon', 'Event Ribbon', 'Legend Ribbon', 'World Champion Ribbon',
            'Birthday Ribbon', 'Special Ribbon', 'Souvenir Ribbon', 'Wishing Ribbon',
            'Classic Ribbon', 'Premier Ribbon', 'Best Friends Ribbon', 'Training Ribbon',
            'Battle Memory Ribbon', 'Skillful Battler Ribbon', 'Expert Battler Ribbon',
            'Effort Ribbon', 'Kalos Champion Ribbon', 'Hoenn Champion Ribbon',
            'Sinnoh Champion Ribbon', 'Galar Champion Ribbon', 'Paldea Champion Ribbon',
            'Master Rank Ribbon', 'Twinkling Star Ribbon', 'Once-in-a-Lifetime Ribbon'
        ];

        this.marks = [
            'Lunchtime Mark', 'Sleepy-Time Mark', 'Dusk Mark', 'Dawn Mark',
            'Cloudy Mark', 'Rainy Mark', 'Stormy Mark', 'Snowy Mark',
            'Blizzard Mark', 'Dry Mark', 'Sandstorm Mark', 'Misty Mark',
            'Destiny Mark', 'Fishing Mark', 'Curry Mark', 'Uncommon Mark',
            'Rare Mark', 'Rowdy Mark', 'Absent-Minded Mark', 'Jittery Mark',
            'Excited Mark', 'Charismatic Mark', 'Calmness Mark', 'Intense Mark',
            'Zoned-Out Mark', 'Joyful Mark', 'Angry Mark', 'Smiley Mark',
            'Teary Mark', 'Upbeat Mark', 'Peeved Mark', 'Intellectual Mark',
            'Ferocious Mark', 'Crafty Mark', 'Scowling Mark', 'Kindly Mark',
            'Flustered Mark', 'Pumped-Up Mark', 'Zero Energy Mark', 'Prideful Mark',
            'Unsure Mark', 'Humble Mark', 'Thorny Mark', 'Vigor Mark',
            'Slump Mark', 'Jumpy Mark', 'Partner Mark', 'Gourmand Mark',
            'Alpha Mark', 'Mightiest Mark', 'Titan Mark', 'Itemfinder Mark'
        ];

        this.init();
    }

    init() {
        this.injectStyles();
        this.createUI();
        this.bindEvents();
    }

    injectStyles() {
        if (document.getElementById('pokemon-creator-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'pokemon-creator-styles';
        styles.textContent = `
            .pokemon-creator-full {
                background: linear-gradient(135deg, #0a0a15 0%, #1a1a2e 50%, #0f0f1a 100%);
                border-radius: 25px;
                padding: 0;
                margin: 30px auto;
                max-width: 1400px;
                border: 3px solid transparent;
                background-clip: padding-box;
                position: relative;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }

            .pokemon-creator-full::before {
                content: '';
                position: absolute;
                top: -3px;
                left: -3px;
                right: -3px;
                bottom: -3px;
                background: linear-gradient(135deg, #00d4ff, #ff6b6b, #ffd700, #00d4ff);
                border-radius: 28px;
                z-index: -1;
                animation: borderGlow 4s ease infinite;
            }

            @keyframes borderGlow {
                0%, 100% { opacity: 0.7; }
                50% { opacity: 1; }
            }

            .pc-header {
                background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 107, 0.1));
                padding: 25px 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 2px solid rgba(255, 255, 255, 0.1);
            }

            .pc-title {
                font-family: 'Orbitron', sans-serif;
                font-size: 2rem;
                margin: 0;
                background: linear-gradient(135deg, #00d4ff, #ff6b6b);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .pc-game-selector {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }

            .pc-game-btn {
                padding: 10px 20px;
                border-radius: 20px;
                border: 2px solid #333;
                background: rgba(255, 255, 255, 0.05);
                color: #888;
                font-size: 0.85rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .pc-game-btn:hover {
                border-color: #00d4ff;
                color: #00d4ff;
            }

            .pc-game-btn.active {
                background: linear-gradient(135deg, #00d4ff, #0099cc);
                border-color: #00d4ff;
                color: #000;
                font-weight: bold;
            }

            .pc-main {
                display: grid;
                grid-template-columns: 320px 1fr;
                min-height: 700px;
            }

            @media (max-width: 1000px) {
                .pc-main {
                    grid-template-columns: 1fr;
                }
            }

            /* Preview Panel */
            .pc-preview-panel {
                background: linear-gradient(180deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
                padding: 30px;
                display: flex;
                flex-direction: column;
                align-items: center;
                border-right: 2px solid rgba(255, 255, 255, 0.1);
            }

            .pc-sprite-container {
                width: 250px;
                height: 250px;
                position: relative;
                margin-bottom: 20px;
            }

            .pc-sprite-bg {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 200px;
                height: 200px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%);
            }

            .pc-sprite {
                width: 100%;
                height: 100%;
                object-fit: contain;
                position: relative;
                z-index: 2;
                filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
                transition: all 0.3s ease;
            }

            .pc-sprite.shiny {
                filter: drop-shadow(0 0 30px gold) drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
                animation: shinyGlow 2s ease-in-out infinite;
            }

            @keyframes shinyGlow {
                0%, 100% { filter: drop-shadow(0 0 20px gold); }
                50% { filter: drop-shadow(0 0 40px gold); }
            }

            .pc-sprite-placeholder {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 5rem;
                color: #333;
            }

            .pc-pokemon-info {
                text-align: center;
                width: 100%;
            }

            .pc-pokemon-name {
                font-family: 'Orbitron', sans-serif;
                font-size: 1.5rem;
                color: #fff;
                margin: 0 0 10px;
            }

            .pc-pokemon-types {
                display: flex;
                justify-content: center;
                gap: 8px;
                margin-bottom: 15px;
            }

            .pc-type-badge {
                padding: 5px 15px;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: bold;
                text-transform: uppercase;
            }

            .pc-stat-preview {
                background: rgba(0, 0, 0, 0.3);
                border-radius: 15px;
                padding: 15px;
                width: 100%;
                margin-top: 15px;
            }

            .pc-stat-row {
                display: flex;
                align-items: center;
                margin-bottom: 8px;
            }

            .pc-stat-label {
                width: 50px;
                font-size: 0.75rem;
                color: #888;
            }

            .pc-stat-bar-container {
                flex: 1;
                height: 12px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                overflow: hidden;
                margin: 0 10px;
            }

            .pc-stat-bar {
                height: 100%;
                border-radius: 6px;
                transition: width 0.3s ease;
            }

            .pc-stat-value {
                width: 35px;
                font-size: 0.8rem;
                font-weight: bold;
                color: #fff;
                text-align: right;
            }

            .pc-quick-actions {
                display: flex;
                gap: 10px;
                margin-top: 20px;
                width: 100%;
            }

            .pc-quick-btn {
                flex: 1;
                padding: 12px;
                border-radius: 10px;
                border: none;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.85rem;
            }

            .pc-shiny-btn {
                background: linear-gradient(135deg, #ffd700, #ff8c00);
                color: #000;
            }

            .pc-shiny-btn.active {
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            }

            .pc-max-btn {
                background: linear-gradient(135deg, #9b59b6, #8e44ad);
                color: #fff;
            }

            /* Editor Panel */
            .pc-editor-panel {
                padding: 0;
                display: flex;
                flex-direction: column;
            }

            .pc-tabs {
                display: flex;
                background: rgba(0, 0, 0, 0.3);
                border-bottom: 2px solid rgba(255, 255, 255, 0.1);
                overflow-x: auto;
            }

            .pc-tab {
                padding: 18px 30px;
                background: transparent;
                border: none;
                color: #666;
                font-size: 0.95rem;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                white-space: nowrap;
                position: relative;
            }

            .pc-tab:hover {
                color: #00d4ff;
                background: rgba(0, 212, 255, 0.05);
            }

            .pc-tab.active {
                color: #00d4ff;
                background: rgba(0, 212, 255, 0.1);
            }

            .pc-tab.active::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, #00d4ff, #ff6b6b);
            }

            .pc-tab-icon {
                margin-right: 8px;
            }

            .pc-tab-content {
                flex: 1;
                padding: 25px;
                overflow-y: auto;
                display: none;
            }

            .pc-tab-content.active {
                display: block;
            }

            /* Form Elements */
            .pc-form-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
            }

            .pc-form-group {
                margin-bottom: 20px;
            }

            .pc-form-group.full-width {
                grid-column: 1 / -1;
            }

            .pc-label {
                display: block;
                color: #888;
                font-size: 0.85rem;
                margin-bottom: 8px;
                font-weight: 500;
            }

            .pc-input, .pc-select {
                width: 100%;
                padding: 12px 15px;
                border-radius: 12px;
                border: 2px solid #333;
                background: rgba(255, 255, 255, 0.05);
                color: #fff;
                font-size: 0.95rem;
                transition: all 0.3s ease;
            }

            .pc-input:focus, .pc-select:focus {
                outline: none;
                border-color: #00d4ff;
                box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
            }

            .pc-select option {
                background: #1a1a2e;
                color: #fff;
            }

            .pc-search-input {
                position: relative;
            }

            .pc-search-input input {
                padding-left: 40px;
            }

            .pc-search-input i {
                position: absolute;
                left: 15px;
                top: 50%;
                transform: translateY(-50%);
                color: #666;
            }

            .pc-search-results {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #1a1a2e;
                border: 2px solid #333;
                border-radius: 0 0 12px 12px;
                max-height: 300px;
                overflow-y: auto;
                z-index: 100;
                display: none;
            }

            .pc-search-results.show {
                display: block;
            }

            .pc-search-result {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 15px;
                cursor: pointer;
                transition: background 0.2s ease;
            }

            .pc-search-result:hover {
                background: rgba(0, 212, 255, 0.1);
            }

            .pc-search-result img {
                width: 40px;
                height: 40px;
            }

            /* Toggle Switches */
            .pc-toggle-group {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .pc-toggle {
                width: 50px;
                height: 26px;
                background: #333;
                border-radius: 13px;
                position: relative;
                cursor: pointer;
                transition: background 0.3s ease;
            }

            .pc-toggle.active {
                background: linear-gradient(135deg, #00d4ff, #0099cc);
            }

            .pc-toggle::after {
                content: '';
                position: absolute;
                width: 22px;
                height: 22px;
                background: #fff;
                border-radius: 50%;
                top: 2px;
                left: 2px;
                transition: transform 0.3s ease;
            }

            .pc-toggle.active::after {
                transform: translateX(24px);
            }

            /* Stat Sliders */
            .pc-stat-editor {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 15px;
            }

            .pc-stat-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
            }

            .pc-stat-name {
                font-weight: bold;
                color: #fff;
            }

            .pc-stat-name.boosted { color: #ff6b6b; }
            .pc-stat-name.reduced { color: #4ecdc4; }

            .pc-stat-values {
                display: flex;
                gap: 20px;
                font-size: 0.85rem;
            }

            .pc-iv-ev-group {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .pc-slider {
                flex: 1;
                -webkit-appearance: none;
                height: 8px;
                border-radius: 4px;
                outline: none;
            }

            .pc-slider.iv-slider {
                background: linear-gradient(to right, #ff6b6b, #ffd700, #4ecdc4);
            }

            .pc-slider.ev-slider {
                background: linear-gradient(to right, #333, #9b59b6);
            }

            .pc-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #fff;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            }

            .pc-slider-value {
                min-width: 40px;
                text-align: center;
                font-weight: bold;
                color: #fff;
            }

            .pc-hyper-train {
                padding: 5px 10px;
                border-radius: 8px;
                border: 2px solid #ffd700;
                background: transparent;
                color: #ffd700;
                font-size: 0.75rem;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .pc-hyper-train.active {
                background: #ffd700;
                color: #000;
            }

            .pc-ev-total {
                background: rgba(0, 0, 0, 0.3);
                border-radius: 12px;
                padding: 15px;
                margin-top: 20px;
            }

            .pc-ev-bar {
                height: 12px;
                background: #222;
                border-radius: 6px;
                overflow: hidden;
                margin-top: 10px;
            }

            .pc-ev-fill {
                height: 100%;
                background: linear-gradient(90deg, #4ecdc4, #00d4ff, #9b59b6);
                border-radius: 6px;
                transition: width 0.3s ease;
            }

            .pc-ev-fill.over {
                background: linear-gradient(90deg, #ff6b6b, #e74c3c);
            }

            /* Moves Section */
            .pc-moves-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }

            @media (max-width: 600px) {
                .pc-moves-grid {
                    grid-template-columns: 1fr;
                }
            }

            .pc-move-slot {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 12px;
                padding: 15px;
                position: relative;
            }

            .pc-move-number {
                position: absolute;
                top: 10px;
                left: 10px;
                width: 25px;
                height: 25px;
                background: rgba(0, 212, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                color: #00d4ff;
            }

            .pc-move-input {
                margin-top: 10px;
            }

            .pc-move-info {
                display: none;
                margin-top: 10px;
                padding: 10px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 8px;
                font-size: 0.85rem;
            }

            .pc-move-info.show {
                display: block;
            }

            .pc-move-type {
                display: inline-block;
                padding: 3px 10px;
                border-radius: 10px;
                font-size: 0.75rem;
                font-weight: bold;
                margin-right: 10px;
            }

            /* Ribbons & Marks Grid */
            .pc-ribbon-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                gap: 10px;
                max-height: 400px;
                overflow-y: auto;
            }

            .pc-ribbon-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.2s ease;
                border: 2px solid transparent;
            }

            .pc-ribbon-item:hover {
                background: rgba(0, 212, 255, 0.1);
            }

            .pc-ribbon-item.selected {
                border-color: #00d4ff;
                background: rgba(0, 212, 255, 0.2);
            }

            .pc-ribbon-icon {
                width: 30px;
                height: 30px;
                background: linear-gradient(135deg, #ffd700, #ff8c00);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
            }

            .pc-ribbon-name {
                flex: 1;
                font-size: 0.8rem;
                color: #ccc;
            }

            /* Action Buttons */
            .pc-actions {
                display: flex;
                gap: 15px;
                padding: 25px;
                background: rgba(0, 0, 0, 0.3);
                border-top: 2px solid rgba(255, 255, 255, 0.1);
            }

            .pc-action-btn {
                flex: 1;
                padding: 18px 25px;
                border-radius: 15px;
                border: none;
                font-size: 1.1rem;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }

            .pc-trade-btn {
                background: linear-gradient(135deg, #00d4ff, #0099cc);
                color: #000;
            }

            .pc-trade-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
            }

            .pc-copy-btn {
                background: linear-gradient(135deg, #2ecc71, #27ae60);
                color: #fff;
            }

            .pc-save-btn {
                background: linear-gradient(135deg, #9b59b6, #8e44ad);
                color: #fff;
            }

            .pc-share-btn {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                color: #fff;
            }

            /* Batch Trading */
            .pc-batch-section {
                margin-top: 20px;
                padding: 20px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 15px;
            }

            .pc-batch-title {
                font-weight: bold;
                color: #00d4ff;
                margin-bottom: 15px;
            }

            .pc-batch-slots {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 15px;
            }

            .pc-batch-slot {
                aspect-ratio: 1;
                background: rgba(255, 255, 255, 0.05);
                border: 2px dashed #333;
                border-radius: 15px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .pc-batch-slot:hover {
                border-color: #00d4ff;
                background: rgba(0, 212, 255, 0.1);
            }

            .pc-batch-slot.filled {
                border-style: solid;
                border-color: #00d4ff;
            }

            .pc-batch-slot img {
                width: 60px;
                height: 60px;
            }

            .pc-batch-slot .slot-label {
                color: #666;
                font-size: 0.85rem;
                margin-top: 5px;
            }

            /* Type colors */
            .type-normal { background: #A8A878; color: #fff; }
            .type-fire { background: #F08030; color: #fff; }
            .type-water { background: #6890F0; color: #fff; }
            .type-electric { background: #F8D030; color: #000; }
            .type-grass { background: #78C850; color: #fff; }
            .type-ice { background: #98D8D8; color: #000; }
            .type-fighting { background: #C03028; color: #fff; }
            .type-poison { background: #A040A0; color: #fff; }
            .type-ground { background: #E0C068; color: #000; }
            .type-flying { background: #A890F0; color: #fff; }
            .type-psychic { background: #F85888; color: #fff; }
            .type-bug { background: #A8B820; color: #fff; }
            .type-rock { background: #B8A038; color: #fff; }
            .type-ghost { background: #705898; color: #fff; }
            .type-dragon { background: #7038F8; color: #fff; }
            .type-dark { background: #705848; color: #fff; }
            .type-steel { background: #B8B8D0; color: #000; }
            .type-fairy { background: #EE99AC; color: #000; }
            .type-stellar { background: linear-gradient(135deg, #ff6b6b, #ffd700, #4ecdc4); color: #fff; }

            /* Stat bar colors */
            .stat-hp { background: linear-gradient(90deg, #ff5959, #ff8080); }
            .stat-atk { background: linear-gradient(90deg, #f5ac78, #f8c8a8); }
            .stat-def { background: linear-gradient(90deg, #fae078, #fcec9c); }
            .stat-spa { background: linear-gradient(90deg, #9db7f5, #bdd0f8); }
            .stat-spd { background: linear-gradient(90deg, #a7db8d, #c6e8b3); }
            .stat-spe { background: linear-gradient(90deg, #fa92b2, #fbb8cc); }
        `;
        document.head.appendChild(styles);
    }

    createUI() {
        const container = document.createElement('div');
        container.id = 'pokemon-creator-full-container';
        container.innerHTML = `
            <div class="pokemon-creator-full">
                <div class="pc-header">
                    <h2 class="pc-title"><i class="fas fa-wand-magic-sparkles"></i> Pokemon Creator</h2>
                    <div class="pc-game-selector">
                        ${Object.entries(this.games).map(([key, game]) => `
                            <button class="pc-game-btn ${key === 'sv' ? 'active' : ''}" data-game="${key}">${game.name}</button>
                        `).join('')}
                    </div>
                </div>

                <div class="pc-main">
                    <!-- Preview Panel -->
                    <div class="pc-preview-panel">
                        <div class="pc-sprite-container">
                            <div class="pc-sprite-bg"></div>
                            <div class="pc-sprite-placeholder" id="pc-sprite">
                                <i class="fas fa-question"></i>
                            </div>
                        </div>

                        <div class="pc-pokemon-info">
                            <h3 class="pc-pokemon-name" id="pc-pokemon-name">Select a Pokemon</h3>
                            <div class="pc-pokemon-types" id="pc-pokemon-types"></div>
                        </div>

                        <div class="pc-quick-actions">
                            <button class="pc-quick-btn pc-shiny-btn" id="pc-shiny-toggle">
                                <i class="fas fa-star"></i> Shiny
                            </button>
                            <button class="pc-quick-btn pc-max-btn" id="pc-max-stats">
                                <i class="fas fa-arrow-up"></i> Max IVs
                            </button>
                        </div>

                        <div class="pc-stat-preview" id="pc-stat-preview">
                            <div class="pc-stat-row">
                                <span class="pc-stat-label">HP</span>
                                <div class="pc-stat-bar-container">
                                    <div class="pc-stat-bar stat-hp" id="preview-hp-bar" style="width: 0%;"></div>
                                </div>
                                <span class="pc-stat-value" id="preview-hp">--</span>
                            </div>
                            <div class="pc-stat-row">
                                <span class="pc-stat-label">Atk</span>
                                <div class="pc-stat-bar-container">
                                    <div class="pc-stat-bar stat-atk" id="preview-atk-bar" style="width: 0%;"></div>
                                </div>
                                <span class="pc-stat-value" id="preview-atk">--</span>
                            </div>
                            <div class="pc-stat-row">
                                <span class="pc-stat-label">Def</span>
                                <div class="pc-stat-bar-container">
                                    <div class="pc-stat-bar stat-def" id="preview-def-bar" style="width: 0%;"></div>
                                </div>
                                <span class="pc-stat-value" id="preview-def">--</span>
                            </div>
                            <div class="pc-stat-row">
                                <span class="pc-stat-label">SpA</span>
                                <div class="pc-stat-bar-container">
                                    <div class="pc-stat-bar stat-spa" id="preview-spa-bar" style="width: 0%;"></div>
                                </div>
                                <span class="pc-stat-value" id="preview-spa">--</span>
                            </div>
                            <div class="pc-stat-row">
                                <span class="pc-stat-label">SpD</span>
                                <div class="pc-stat-bar-container">
                                    <div class="pc-stat-bar stat-spd" id="preview-spd-bar" style="width: 0%;"></div>
                                </div>
                                <span class="pc-stat-value" id="preview-spd">--</span>
                            </div>
                            <div class="pc-stat-row">
                                <span class="pc-stat-label">Spe</span>
                                <div class="pc-stat-bar-container">
                                    <div class="pc-stat-bar stat-spe" id="preview-spe-bar" style="width: 0%;"></div>
                                </div>
                                <span class="pc-stat-value" id="preview-spe">--</span>
                            </div>
                        </div>
                    </div>

                    <!-- Editor Panel -->
                    <div class="pc-editor-panel">
                        <div class="pc-tabs">
                            <button class="pc-tab active" data-tab="basics">
                                <i class="pc-tab-icon fas fa-info-circle"></i>Basics
                            </button>
                            <button class="pc-tab" data-tab="stats">
                                <i class="pc-tab-icon fas fa-chart-bar"></i>Stats
                            </button>
                            <button class="pc-tab" data-tab="moves">
                                <i class="pc-tab-icon fas fa-bolt"></i>Moves
                            </button>
                            <button class="pc-tab" data-tab="cosmetic">
                                <i class="pc-tab-icon fas fa-paint-brush"></i>Cosmetic
                            </button>
                            <button class="pc-tab" data-tab="ot">
                                <i class="pc-tab-icon fas fa-user"></i>OT/Misc
                            </button>
                        </div>

                        <!-- Basics Tab -->
                        <div class="pc-tab-content active" id="tab-basics">
                            <div class="pc-form-grid">
                                <div class="pc-form-group full-width">
                                    <label class="pc-label">Pokemon Species</label>
                                    <div class="pc-search-input">
                                        <i class="fas fa-search"></i>
                                        <input type="text" class="pc-input" id="pc-species-search" placeholder="Search Pokemon...">
                                        <div class="pc-search-results" id="pc-species-results"></div>
                                    </div>
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Nickname (Optional)</label>
                                    <input type="text" class="pc-input" id="pc-nickname" placeholder="Enter nickname..." maxlength="12">
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Level</label>
                                    <input type="number" class="pc-input" id="pc-level" value="100" min="1" max="100">
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Gender</label>
                                    <select class="pc-select" id="pc-gender">
                                        <option value="random">Random</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="genderless">Genderless</option>
                                    </select>
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Nature</label>
                                    <select class="pc-select" id="pc-nature">
                                        ${this.natures.map(n => `<option value="${n}">${n}</option>`).join('')}
                                    </select>
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Ability</label>
                                    <select class="pc-select" id="pc-ability">
                                        <option value="">Select Pokemon first...</option>
                                    </select>
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Held Item</label>
                                    <select class="pc-select" id="pc-item">
                                        ${this.popularItems.map(i => `<option value="${i}">${i}</option>`).join('')}
                                    </select>
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Pokeball</label>
                                    <select class="pc-select" id="pc-pokeball">
                                        ${this.pokeballs.map(b => `<option value="${b}">${b}</option>`).join('')}
                                    </select>
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Tera Type</label>
                                    <select class="pc-select" id="pc-tera">
                                        <option value="">Match Type</option>
                                        ${this.teraTypes.map(t => `<option value="${t}">${t}</option>`).join('')}
                                    </select>
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Form</label>
                                    <select class="pc-select" id="pc-form">
                                        <option value="0">Default</option>
                                    </select>
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Gigantamax</label>
                                    <div class="pc-toggle-group">
                                        <div class="pc-toggle" id="pc-gmax-toggle"></div>
                                        <span>Enable G-Max</span>
                                    </div>
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Alpha (PLA)</label>
                                    <div class="pc-toggle-group">
                                        <div class="pc-toggle" id="pc-alpha-toggle"></div>
                                        <span>Alpha Pokemon</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Stats Tab -->
                        <div class="pc-tab-content" id="tab-stats">
                            ${this.createStatsEditor()}
                        </div>

                        <!-- Moves Tab -->
                        <div class="pc-tab-content" id="tab-moves">
                            <div class="pc-moves-grid">
                                ${[1, 2, 3, 4].map(i => `
                                    <div class="pc-move-slot">
                                        <div class="pc-move-number">${i}</div>
                                        <div class="pc-move-input">
                                            <input type="text" class="pc-input" id="pc-move-${i}" placeholder="Search move...">
                                        </div>
                                        <div class="pc-move-info" id="pc-move-info-${i}"></div>
                                    </div>
                                `).join('')}
                            </div>

                            <div class="pc-batch-section">
                                <div class="pc-batch-title"><i class="fas fa-magic"></i> Quick Move Sets</div>
                                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                                    <button class="pc-quick-btn" style="background: #3498db; color: #fff;" id="pc-smogon-moves">Load Smogon Set</button>
                                    <button class="pc-quick-btn" style="background: #e74c3c; color: #fff;" id="pc-clear-moves">Clear All Moves</button>
                                </div>
                            </div>
                        </div>

                        <!-- Cosmetic Tab -->
                        <div class="pc-tab-content" id="tab-cosmetic">
                            <div class="pc-form-grid">
                                <div class="pc-form-group">
                                    <label class="pc-label">Friendship (0-255)</label>
                                    <input type="number" class="pc-input" id="pc-friendship" value="255" min="0" max="255">
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Scale (1-255)</label>
                                    <input type="number" class="pc-input" id="pc-scale" value="128" min="1" max="255">
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Dynamax Level (0-10)</label>
                                    <input type="number" class="pc-input" id="pc-dynamax" value="10" min="0" max="10">
                                </div>
                            </div>

                            <div class="pc-form-group full-width" style="margin-top: 25px;">
                                <label class="pc-label"><i class="fas fa-ribbon"></i> Ribbons</label>
                                <div class="pc-ribbon-grid" id="pc-ribbons-grid">
                                    ${this.ribbons.map(r => `
                                        <div class="pc-ribbon-item" data-ribbon="${r}">
                                            <div class="pc-ribbon-icon"><i class="fas fa-ribbon"></i></div>
                                            <span class="pc-ribbon-name">${r}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="pc-form-group full-width" style="margin-top: 25px;">
                                <label class="pc-label"><i class="fas fa-certificate"></i> Marks</label>
                                <div class="pc-ribbon-grid" id="pc-marks-grid">
                                    ${this.marks.map(m => `
                                        <div class="pc-ribbon-item" data-mark="${m}">
                                            <div class="pc-ribbon-icon" style="background: linear-gradient(135deg, #9b59b6, #8e44ad);"><i class="fas fa-certificate"></i></div>
                                            <span class="pc-ribbon-name">${m}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                        <!-- OT/Misc Tab -->
                        <div class="pc-tab-content" id="tab-ot">
                            <div class="pc-form-grid">
                                <div class="pc-form-group">
                                    <label class="pc-label">Original Trainer Name</label>
                                    <input type="text" class="pc-input" id="pc-ot-name" value="PKM-Universe" maxlength="12">
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Trainer ID (TID)</label>
                                    <input type="text" class="pc-input" id="pc-tid" value="000000" maxlength="6">
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Secret ID (SID)</label>
                                    <input type="text" class="pc-input" id="pc-sid" value="0000" maxlength="4">
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Trainer Gender</label>
                                    <select class="pc-select" id="pc-ot-gender">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Language</label>
                                    <select class="pc-select" id="pc-language">
                                        ${this.languages.map(l => `<option value="${l.code}">${l.name}</option>`).join('')}
                                    </select>
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Met Location</label>
                                    <input type="text" class="pc-input" id="pc-met-location" placeholder="e.g., Paldea">
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Met Level</label>
                                    <input type="number" class="pc-input" id="pc-met-level" value="1" min="1" max="100">
                                </div>

                                <div class="pc-form-group">
                                    <label class="pc-label">Met Date</label>
                                    <input type="date" class="pc-input" id="pc-met-date">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="pc-actions">
                    <button class="pc-action-btn pc-trade-btn" id="pc-trade-btn">
                        <i class="fas fa-exchange-alt"></i> Trade Now
                    </button>
                    <button class="pc-action-btn pc-copy-btn" id="pc-copy-btn">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                    <button class="pc-action-btn pc-save-btn" id="pc-save-btn">
                        <i class="fas fa-save"></i> Save
                    </button>
                    <button class="pc-action-btn pc-share-btn" id="pc-share-btn">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                </div>

                <!-- Batch Trading Section -->
                <div style="padding: 25px; border-top: 2px solid rgba(255,255,255,0.1);">
                    <div class="pc-batch-title" style="font-size: 1.2rem; margin-bottom: 20px;">
                        <i class="fas fa-layer-group"></i> Batch Trading (Up to 4 Pokemon)
                    </div>
                    <div class="pc-batch-slots">
                        ${[1, 2, 3, 4].map(i => `
                            <div class="pc-batch-slot" data-slot="${i}">
                                <i class="fas fa-plus" style="font-size: 2rem; color: #333;"></i>
                                <span class="slot-label">Slot ${i}</span>
                            </div>
                        `).join('')}
                    </div>
                    <button class="pc-action-btn pc-trade-btn" style="margin-top: 20px; width: 100%;" id="pc-batch-trade">
                        <i class="fas fa-paper-plane"></i> Trade All (Batch)
                    </button>
                </div>
            </div>
        `;

        // Insert into the dedicated Pokemon Creator section container
        const creatorContainer = document.getElementById('pokemon-creator-container');
        if (creatorContainer) {
            creatorContainer.appendChild(container);
        } else {
            // Fallback: Insert before the existing PKHeX creator if it exists
            const existingCreator = document.getElementById('pkhex-creator-container');
            if (existingCreator) {
                existingCreator.parentNode.insertBefore(container, existingCreator);
                existingCreator.style.display = 'none'; // Hide the simpler one
            } else {
                // Last resort: append to main content
                const mainContent = document.querySelector('.live-trading-section') ||
                                   document.querySelector('#dashboard') ||
                                   document.querySelector('main') ||
                                   document.body;
                mainContent.insertBefore(container, mainContent.firstChild);
            }
        }

        // Set default date
        document.getElementById('pc-met-date').value = new Date().toISOString().split('T')[0];
    }

    createStatsEditor() {
        const stats = [
            { key: 'hp', name: 'HP' },
            { key: 'atk', name: 'Attack' },
            { key: 'def', name: 'Defense' },
            { key: 'spa', name: 'Sp. Attack' },
            { key: 'spd', name: 'Sp. Defense' },
            { key: 'spe', name: 'Speed' }
        ];

        return `
            ${stats.map(stat => `
                <div class="pc-stat-editor">
                    <div class="pc-stat-header">
                        <span class="pc-stat-name" id="stat-name-${stat.key}">${stat.name}</span>
                        <div class="pc-stat-values">
                            <span>Base: <strong id="base-${stat.key}">--</strong></span>
                            <span>Final: <strong id="final-${stat.key}">--</strong></span>
                        </div>
                    </div>
                    <div class="pc-iv-ev-group">
                        <span style="color: #888; font-size: 0.8rem; width: 25px;">IV</span>
                        <input type="range" class="pc-slider iv-slider" id="iv-${stat.key}" min="0" max="31" value="31">
                        <span class="pc-slider-value" id="iv-val-${stat.key}">31</span>
                        <button class="pc-hyper-train" id="ht-${stat.key}" title="Hyper Train">HT</button>
                    </div>
                    <div class="pc-iv-ev-group" style="margin-top: 10px;">
                        <span style="color: #888; font-size: 0.8rem; width: 25px;">EV</span>
                        <input type="range" class="pc-slider ev-slider" id="ev-${stat.key}" min="0" max="252" value="0">
                        <span class="pc-slider-value" id="ev-val-${stat.key}">0</span>
                    </div>
                </div>
            `).join('')}

            <div class="pc-ev-total">
                <div style="display: flex; justify-content: space-between;">
                    <span>EV Total</span>
                    <span><strong id="ev-total">0</strong> / 510</span>
                </div>
                <div class="pc-ev-bar">
                    <div class="pc-ev-fill" id="ev-fill" style="width: 0%;"></div>
                </div>
            </div>

            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px;">
                <button class="pc-quick-btn" style="background: #27ae60; color: #fff;" data-spread="physical">Physical Sweeper</button>
                <button class="pc-quick-btn" style="background: #3498db; color: #fff;" data-spread="special">Special Sweeper</button>
                <button class="pc-quick-btn" style="background: #f39c12; color: #fff;" data-spread="tank">Physical Tank</button>
                <button class="pc-quick-btn" style="background: #9b59b6; color: #fff;" data-spread="spdef">Special Tank</button>
                <button class="pc-quick-btn" style="background: #e74c3c; color: #fff;" data-spread="clear">Clear EVs</button>
            </div>
        `;
    }

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.pc-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.pc-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.pc-tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
            });
        });

        // Game selection
        document.querySelectorAll('.pc-game-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.pc-game-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.pokemon.game = btn.dataset.game;
            });
        });

        // Pokemon search
        const searchInput = document.getElementById('pc-species-search');
        const searchResults = document.getElementById('pc-species-results');

        searchInput?.addEventListener('input', async (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                searchResults.classList.remove('show');
                return;
            }

            // Fetch matching Pokemon
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`);
                const data = await response.json();
                const matches = data.results
                    .filter(p => p.name.includes(query))
                    .slice(0, 10);

                if (matches.length > 0) {
                    searchResults.innerHTML = matches.map(p => {
                        const id = p.url.split('/').filter(Boolean).pop();
                        return `
                            <div class="pc-search-result" data-name="${p.name}" data-id="${id}">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${p.name}">
                                <span>#${id} ${p.name.charAt(0).toUpperCase() + p.name.slice(1)}</span>
                            </div>
                        `;
                    }).join('');
                    searchResults.classList.add('show');

                    // Bind click events
                    searchResults.querySelectorAll('.pc-search-result').forEach(result => {
                        result.addEventListener('click', () => {
                            this.loadPokemon(result.dataset.name, result.dataset.id);
                            searchResults.classList.remove('show');
                            searchInput.value = result.dataset.name.charAt(0).toUpperCase() + result.dataset.name.slice(1);
                        });
                    });
                } else {
                    searchResults.classList.remove('show');
                }
            } catch (error) {
                console.error('Search error:', error);
            }
        });

        // Close search on click outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.pc-search-input')) {
                searchResults.classList.remove('show');
            }
        });

        // Shiny toggle
        document.getElementById('pc-shiny-toggle')?.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('active');
            this.pokemon.shiny = e.currentTarget.classList.contains('active');
            this.updateSprite();
        });

        // Max IVs button
        document.getElementById('pc-max-stats')?.addEventListener('click', () => {
            Object.keys(this.pokemon.ivs).forEach(stat => {
                this.pokemon.ivs[stat] = 31;
                document.getElementById(`iv-${stat}`).value = 31;
                document.getElementById(`iv-val-${stat}`).textContent = 31;
            });
            this.updateStatPreview();
        });

        // IV/EV sliders
        ['hp', 'atk', 'def', 'spa', 'spd', 'spe'].forEach(stat => {
            document.getElementById(`iv-${stat}`)?.addEventListener('input', (e) => {
                this.pokemon.ivs[stat] = parseInt(e.target.value);
                document.getElementById(`iv-val-${stat}`).textContent = e.target.value;
                this.updateStatPreview();
            });

            document.getElementById(`ev-${stat}`)?.addEventListener('input', (e) => {
                const newValue = parseInt(e.target.value);
                const currentTotal = Object.values(this.pokemon.evs).reduce((a, b) => a + b, 0);
                const oldValue = this.pokemon.evs[stat];
                const newTotal = currentTotal - oldValue + newValue;

                if (newTotal <= 510) {
                    this.pokemon.evs[stat] = newValue;
                    document.getElementById(`ev-val-${stat}`).textContent = newValue;
                } else {
                    const maxAllowed = 510 - (currentTotal - oldValue);
                    this.pokemon.evs[stat] = maxAllowed;
                    e.target.value = maxAllowed;
                    document.getElementById(`ev-val-${stat}`).textContent = maxAllowed;
                }
                this.updateEVTotal();
                this.updateStatPreview();
            });

            // Hyper Training
            document.getElementById(`ht-${stat}`)?.addEventListener('click', (e) => {
                e.currentTarget.classList.toggle('active');
                this.pokemon.hyperTrained[stat] = e.currentTarget.classList.contains('active');
                this.updateStatPreview();
            });
        });

        // EV spread presets
        document.querySelectorAll('[data-spread]').forEach(btn => {
            btn.addEventListener('click', () => this.applyEVSpread(btn.dataset.spread));
        });

        // Nature change
        document.getElementById('pc-nature')?.addEventListener('change', (e) => {
            this.pokemon.nature = e.target.value;
            this.updateNatureHighlights();
            this.updateStatPreview();
        });

        // Level change
        document.getElementById('pc-level')?.addEventListener('change', (e) => {
            this.pokemon.level = Math.min(100, Math.max(1, parseInt(e.target.value) || 100));
            e.target.value = this.pokemon.level;
            this.updateStatPreview();
        });

        // Toggle switches
        ['pc-gmax-toggle', 'pc-alpha-toggle'].forEach(id => {
            document.getElementById(id)?.addEventListener('click', (e) => {
                e.currentTarget.classList.toggle('active');
            });
        });

        // Ribbons selection
        document.querySelectorAll('.pc-ribbon-item[data-ribbon]').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('selected');
                const ribbon = item.dataset.ribbon;
                if (item.classList.contains('selected')) {
                    this.pokemon.ribbons.push(ribbon);
                } else {
                    this.pokemon.ribbons = this.pokemon.ribbons.filter(r => r !== ribbon);
                }
            });
        });

        // Marks selection
        document.querySelectorAll('.pc-ribbon-item[data-mark]').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('selected');
                const mark = item.dataset.mark;
                if (item.classList.contains('selected')) {
                    this.pokemon.marks.push(mark);
                } else {
                    this.pokemon.marks = this.pokemon.marks.filter(m => m !== mark);
                }
            });
        });

        // Action buttons
        document.getElementById('pc-trade-btn')?.addEventListener('click', () => this.trade());
        document.getElementById('pc-copy-btn')?.addEventListener('click', () => this.copyShowdown());
        document.getElementById('pc-save-btn')?.addEventListener('click', () => this.savePokemon());
        document.getElementById('pc-share-btn')?.addEventListener('click', () => this.sharePokemon());

        // Batch slots
        document.querySelectorAll('.pc-batch-slot').forEach(slot => {
            slot.addEventListener('click', () => this.addToBatch(slot));
        });
    }

    async loadPokemon(name, id) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id || name}`);
            const data = await response.json();

            this.pokemon.species = data.name;
            this.pokemon.speciesId = data.id;

            // Store base stats
            this.baseStats = {};
            data.stats.forEach(s => {
                const statMap = {
                    'hp': 'hp', 'attack': 'atk', 'defense': 'def',
                    'special-attack': 'spa', 'special-defense': 'spd', 'speed': 'spe'
                };
                this.baseStats[statMap[s.stat.name]] = s.base_stat;
            });

            // Update preview
            this.updateSprite();
            document.getElementById('pc-pokemon-name').textContent =
                data.name.charAt(0).toUpperCase() + data.name.slice(1);

            // Types
            const typesContainer = document.getElementById('pc-pokemon-types');
            typesContainer.innerHTML = data.types.map(t =>
                `<span class="pc-type-badge type-${t.type.name}">${t.type.name}</span>`
            ).join('');

            // Abilities
            this.abilities = data.abilities;
            const abilitySelect = document.getElementById('pc-ability');
            abilitySelect.innerHTML = data.abilities.map((a, i) =>
                `<option value="${i}">${a.ability.name.replace(/-/g, ' ')}${a.is_hidden ? ' (HA)' : ''}</option>`
            ).join('');

            // Update stat base values
            Object.entries(this.baseStats).forEach(([stat, value]) => {
                document.getElementById(`base-${stat}`).textContent = value;
            });

            this.updateStatPreview();
            this.updateNatureHighlights();

        } catch (error) {
            console.error('Error loading Pokemon:', error);
        }
    }

    updateSprite() {
        const spriteContainer = document.getElementById('pc-sprite');
        if (!this.pokemon.speciesId) {
            spriteContainer.innerHTML = '<i class="fas fa-question"></i>';
            spriteContainer.className = 'pc-sprite-placeholder';
            return;
        }

        const spriteUrl = this.pokemon.shiny
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${this.pokemon.speciesId}.png`
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon.speciesId}.png`;

        spriteContainer.innerHTML = `<img src="${spriteUrl}" alt="${this.pokemon.species}" class="pc-sprite ${this.pokemon.shiny ? 'shiny' : ''}">`;
        spriteContainer.className = '';
    }

    updateStatPreview() {
        const stats = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
        const maxStat = 700;

        stats.forEach(stat => {
            const baseStat = this.baseStats[stat] || 0;
            const iv = this.pokemon.hyperTrained[stat] ? 31 : this.pokemon.ivs[stat];
            const ev = this.pokemon.evs[stat];
            const level = this.pokemon.level;

            let finalStat;
            if (stat === 'hp') {
                finalStat = Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
            } else {
                const natureEffect = this.natureEffects[this.pokemon.nature];
                let natureMod = 1;
                if (natureEffect.plus === stat) natureMod = 1.1;
                if (natureEffect.minus === stat) natureMod = 0.9;

                finalStat = Math.floor((Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + 5) * natureMod);
            }

            document.getElementById(`preview-${stat}`).textContent = finalStat;
            document.getElementById(`final-${stat}`).textContent = finalStat;
            document.getElementById(`preview-${stat}-bar`).style.width = `${Math.min(100, (finalStat / maxStat) * 100)}%`;
        });
    }

    updateNatureHighlights() {
        const natureEffect = this.natureEffects[this.pokemon.nature];

        ['hp', 'atk', 'def', 'spa', 'spd', 'spe'].forEach(stat => {
            const nameEl = document.getElementById(`stat-name-${stat}`);
            if (nameEl) {
                nameEl.classList.remove('boosted', 'reduced');
                if (natureEffect.plus === stat) nameEl.classList.add('boosted');
                if (natureEffect.minus === stat) nameEl.classList.add('reduced');
            }
        });
    }

    updateEVTotal() {
        const total = Object.values(this.pokemon.evs).reduce((a, b) => a + b, 0);
        document.getElementById('ev-total').textContent = total;
        const fill = document.getElementById('ev-fill');
        fill.style.width = `${(total / 510) * 100}%`;
        fill.classList.toggle('over', total > 510);
    }

    applyEVSpread(spread) {
        const spreads = {
            physical: { hp: 0, atk: 252, def: 0, spa: 0, spd: 4, spe: 252 },
            special: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 252 },
            tank: { hp: 252, atk: 0, def: 252, spa: 0, spd: 4, spe: 0 },
            spdef: { hp: 252, atk: 0, def: 4, spa: 0, spd: 252, spe: 0 },
            clear: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
        };

        if (spreads[spread]) {
            this.pokemon.evs = { ...spreads[spread] };
            Object.entries(this.pokemon.evs).forEach(([stat, value]) => {
                document.getElementById(`ev-${stat}`).value = value;
                document.getElementById(`ev-val-${stat}`).textContent = value;
            });
            this.updateEVTotal();
            this.updateStatPreview();
        }
    }

    generateShowdown() {
        if (!this.pokemon.species) return '';

        const name = this.pokemon.species.charAt(0).toUpperCase() + this.pokemon.species.slice(1);
        const nickname = document.getElementById('pc-nickname')?.value;
        const item = document.getElementById('pc-item')?.value;
        const abilityIndex = document.getElementById('pc-ability')?.value;
        const ability = this.abilities[abilityIndex]?.ability.name.replace(/-/g, ' ') || '';

        const evStrings = [];
        Object.entries(this.pokemon.evs).forEach(([stat, value]) => {
            if (value > 0) {
                const statNames = { hp: 'HP', atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe' };
                evStrings.push(`${value} ${statNames[stat]}`);
            }
        });

        const ivStrings = [];
        Object.entries(this.pokemon.ivs).forEach(([stat, value]) => {
            if (value < 31) {
                const statNames = { hp: 'HP', atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe' };
                ivStrings.push(`${value} ${statNames[stat]}`);
            }
        });

        const moves = [1, 2, 3, 4].map(i => document.getElementById(`pc-move-${i}`)?.value).filter(m => m);

        let showdown = nickname ? `${nickname} (${name})` : name;
        if (item && item !== 'None') showdown += ` @ ${item}`;
        showdown += '\n';
        showdown += `Ability: ${ability}\n`;
        if (this.pokemon.shiny) showdown += `Shiny: Yes\n`;
        const tera = document.getElementById('pc-tera')?.value;
        if (tera) showdown += `Tera Type: ${tera}\n`;
        if (evStrings.length) showdown += `EVs: ${evStrings.join(' / ')}\n`;
        showdown += `${this.pokemon.nature} Nature\n`;
        if (ivStrings.length) showdown += `IVs: ${ivStrings.join(' / ')}\n`;
        moves.forEach(m => showdown += `- ${m}\n`);

        return showdown;
    }

    trade() {
        if (!this.pokemon.species) {
            alert('Please select a Pokemon first!');
            return;
        }

        const showdown = this.generateShowdown();
        navigator.clipboard.writeText(showdown).then(() => {
            alert('Pokemon data copied! Paste it in the Discord trade channel.\n\n' + showdown);
        });

        // Trigger celebration
        if (window.tradeAnimations) {
            window.tradeAnimations.pokeballBurst(window.innerWidth / 2, window.innerHeight / 2);
        }
    }

    copyShowdown() {
        const showdown = this.generateShowdown();
        if (!showdown) {
            alert('Please select a Pokemon first!');
            return;
        }

        navigator.clipboard.writeText(showdown).then(() => {
            alert('Showdown format copied to clipboard!');
        });
    }

    savePokemon() {
        if (!this.pokemon.species) {
            alert('Please select a Pokemon first!');
            return;
        }

        const saveData = {
            ...this.pokemon,
            nickname: document.getElementById('pc-nickname')?.value,
            ability: document.getElementById('pc-ability')?.value,
            item: document.getElementById('pc-item')?.value,
            tera: document.getElementById('pc-tera')?.value,
            moves: [1, 2, 3, 4].map(i => document.getElementById(`pc-move-${i}`)?.value)
        };

        const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.pokemon.species}_build.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    sharePokemon() {
        if (!this.pokemon.species) {
            alert('Please select a Pokemon first!');
            return;
        }

        const showdown = this.generateShowdown();
        const shareUrl = `https://pkm-universe-live-trading.com/?pokemon=${encodeURIComponent(btoa(showdown))}`;

        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Share link copied to clipboard!');
        });
    }

    addToBatch(slot) {
        if (!this.pokemon.species) {
            alert('Please select a Pokemon first!');
            return;
        }

        slot.classList.add('filled');
        slot.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon.speciesId}.png" alt="${this.pokemon.species}">
            <span class="slot-label">${this.pokemon.species}</span>
        `;
    }
}

// Initialize
window.pokemonCreator = new PokemonCreator();
