/**
 * PKM-Universe Pokemon Creator - Step-by-Step Wizard
 * Unique wizard-style interface completely different from other creators
 * Features: Progress steps, animated transitions, floating preview
 */

class PokemonCreatorWizard {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;

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
            nature: 'Adamant',
            ability: '',
            teraType: 'Normal',
            ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
            moves: ['', '', '', ''],
            ot: {
                name: 'PKM-Universe',
                tid: '000000',
                sid: '0000'
            }
        };

        this.natures = [
            { name: 'Adamant', plus: 'Atk', minus: 'SpA' },
            { name: 'Jolly', plus: 'Spe', minus: 'SpA' },
            { name: 'Modest', plus: 'SpA', minus: 'Atk' },
            { name: 'Timid', plus: 'Spe', minus: 'Atk' },
            { name: 'Bold', plus: 'Def', minus: 'Atk' },
            { name: 'Calm', plus: 'SpD', minus: 'Atk' },
            { name: 'Impish', plus: 'Def', minus: 'SpA' },
            { name: 'Careful', plus: 'SpD', minus: 'SpA' },
            { name: 'Brave', plus: 'Atk', minus: 'Spe' },
            { name: 'Quiet', plus: 'SpA', minus: 'Spe' },
            { name: 'Relaxed', plus: 'Def', minus: 'Spe' },
            { name: 'Sassy', plus: 'SpD', minus: 'Spe' },
            { name: 'Naive', plus: 'Spe', minus: 'SpD' },
            { name: 'Hasty', plus: 'Spe', minus: 'Def' },
            { name: 'Hardy', plus: null, minus: null },
            { name: 'Docile', plus: null, minus: null },
            { name: 'Serious', plus: null, minus: null },
            { name: 'Bashful', plus: null, minus: null },
            { name: 'Quirky', plus: null, minus: null }
        ];

        this.pokeballs = [
            'Poke Ball', 'Great Ball', 'Ultra Ball', 'Master Ball',
            'Premier Ball', 'Luxury Ball', 'Dusk Ball', 'Timer Ball',
            'Quick Ball', 'Heal Ball', 'Net Ball', 'Nest Ball',
            'Dive Ball', 'Repeat Ball', 'Level Ball', 'Lure Ball',
            'Moon Ball', 'Friend Ball', 'Love Ball', 'Heavy Ball',
            'Fast Ball', 'Sport Ball', 'Safari Ball', 'Dream Ball',
            'Beast Ball', 'Cherish Ball'
        ];

        this.teraTypes = [
            'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice',
            'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
            'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy', 'Stellar'
        ];

        this.init();
    }

    init() {
        this.injectStyles();
        this.createWizardUI();
        this.bindEvents();
    }

    injectStyles() {
        if (document.getElementById('pkm-wizard-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'pkm-wizard-styles';
        styles.textContent = `
            /* ========================================
               PKM-Universe Wizard - Unique Design
               ======================================== */

            .pkm-wizard-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                position: relative;
            }

            /* Progress Bar - Pokeball Theme */
            .wizard-progress {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 40px;
                padding: 20px 40px;
                background: linear-gradient(180deg, rgba(20,20,30,0.9) 0%, rgba(10,10,20,0.95) 100%);
                border-radius: 60px;
                border: 2px solid rgba(0, 212, 255, 0.3);
                position: relative;
                overflow: hidden;
            }

            .wizard-progress::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 60px;
                right: 60px;
                height: 4px;
                background: rgba(255,255,255,0.1);
                transform: translateY(-50%);
                z-index: 0;
            }

            .wizard-progress-fill {
                position: absolute;
                top: 50%;
                left: 60px;
                height: 4px;
                background: linear-gradient(90deg, #00d4ff, #00ff88);
                transform: translateY(-50%);
                transition: width 0.5s ease;
                z-index: 1;
                border-radius: 2px;
                box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
            }

            .wizard-step-indicator {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                z-index: 2;
                cursor: pointer;
                transition: transform 0.3s ease;
            }

            .wizard-step-indicator:hover {
                transform: scale(1.1);
            }

            .wizard-step-ball {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(180deg, #ff4444 0%, #ff4444 45%, #222 45%, #222 55%, #fff 55%, #fff 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            }

            .wizard-step-ball::before {
                content: '';
                position: absolute;
                width: 18px;
                height: 18px;
                background: #fff;
                border-radius: 50%;
                border: 4px solid #222;
            }

            .wizard-step-ball.active {
                background: linear-gradient(180deg, #00d4ff 0%, #00d4ff 45%, #222 45%, #222 55%, #fff 55%, #fff 100%);
                transform: scale(1.15);
                box-shadow: 0 0 25px rgba(0, 212, 255, 0.6);
            }

            .wizard-step-ball.completed {
                background: linear-gradient(180deg, #00ff88 0%, #00ff88 45%, #222 45%, #222 55%, #fff 55%, #fff 100%);
            }

            .wizard-step-ball.completed::after {
                content: '✓';
                position: absolute;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
                text-shadow: 0 0 5px rgba(0,0,0,0.5);
            }

            .wizard-step-label {
                font-size: 0.75rem;
                color: #888;
                text-transform: uppercase;
                letter-spacing: 1px;
                transition: color 0.3s ease;
            }

            .wizard-step-indicator.active .wizard-step-label {
                color: #00d4ff;
                font-weight: 600;
            }

            .wizard-step-indicator.completed .wizard-step-label {
                color: #00ff88;
            }

            /* Main Content Area */
            .wizard-main {
                display: flex;
                gap: 30px;
                min-height: 500px;
            }

            /* Floating Preview Panel */
            .wizard-preview {
                width: 280px;
                flex-shrink: 0;
                background: linear-gradient(135deg, rgba(20,20,35,0.95) 0%, rgba(10,10,25,0.98) 100%);
                border-radius: 20px;
                border: 2px solid rgba(0, 212, 255, 0.2);
                padding: 25px;
                position: sticky;
                top: 100px;
                height: fit-content;
            }

            .preview-sprite-container {
                width: 200px;
                height: 200px;
                margin: 0 auto 20px;
                background: radial-gradient(circle at center, rgba(0,212,255,0.1) 0%, transparent 70%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .preview-sprite-container::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                border: 2px dashed rgba(0,212,255,0.3);
                border-radius: 50%;
                animation: rotateBorder 20s linear infinite;
            }

            @keyframes rotateBorder {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            .preview-sprite {
                width: 160px;
                height: 160px;
                object-fit: contain;
                filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
                transition: transform 0.3s ease;
            }

            .preview-sprite:hover {
                transform: scale(1.1);
            }

            .preview-sprite.shiny {
                filter: drop-shadow(0 0 20px rgba(255,215,0,0.6)) drop-shadow(0 10px 20px rgba(0,0,0,0.3));
            }

            .preview-name {
                text-align: center;
                font-size: 1.4rem;
                font-weight: 700;
                color: #fff;
                margin-bottom: 5px;
                font-family: 'Orbitron', sans-serif;
            }

            .preview-level {
                text-align: center;
                font-size: 0.9rem;
                color: #00d4ff;
                margin-bottom: 15px;
            }

            .preview-badges {
                display: flex;
                justify-content: center;
                gap: 8px;
                flex-wrap: wrap;
                margin-bottom: 15px;
            }

            .preview-badge {
                padding: 4px 10px;
                border-radius: 12px;
                font-size: 0.7rem;
                font-weight: 600;
                text-transform: uppercase;
            }

            .preview-badge.shiny {
                background: linear-gradient(135deg, #ffd700, #ff8c00);
                color: #000;
            }

            .preview-badge.game {
                background: rgba(0, 212, 255, 0.2);
                color: #00d4ff;
                border: 1px solid rgba(0, 212, 255, 0.3);
            }

            .preview-stats {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
            }

            .preview-stat {
                background: rgba(0,0,0,0.3);
                padding: 8px;
                border-radius: 8px;
                text-align: center;
            }

            .preview-stat-label {
                font-size: 0.65rem;
                color: #888;
                text-transform: uppercase;
            }

            .preview-stat-value {
                font-size: 1rem;
                font-weight: 700;
                color: #fff;
            }

            /* Step Content Card */
            .wizard-step-content {
                flex: 1;
                background: linear-gradient(135deg, rgba(20,20,35,0.9) 0%, rgba(15,15,30,0.95) 100%);
                border-radius: 25px;
                border: 2px solid rgba(0, 212, 255, 0.2);
                padding: 40px;
                display: none;
                animation: fadeSlideIn 0.4s ease;
            }

            .wizard-step-content.active {
                display: block;
            }

            @keyframes fadeSlideIn {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            .step-header {
                margin-bottom: 30px;
            }

            .step-number {
                display: inline-block;
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #00d4ff, #0099cc);
                border-radius: 50%;
                color: #000;
                font-weight: 800;
                font-size: 1.2rem;
                line-height: 40px;
                text-align: center;
                margin-right: 15px;
            }

            .step-title {
                display: inline;
                font-size: 1.8rem;
                font-weight: 700;
                color: #fff;
                font-family: 'Orbitron', sans-serif;
            }

            .step-subtitle {
                color: #888;
                margin-top: 8px;
                font-size: 0.95rem;
            }

            /* Form Elements */
            .wizard-form-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 25px;
            }

            .wizard-form-grid.single {
                grid-template-columns: 1fr;
            }

            .wizard-form-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .wizard-form-group.full-width {
                grid-column: 1 / -1;
            }

            .wizard-label {
                font-size: 0.85rem;
                color: #aaa;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
            }

            .wizard-input,
            .wizard-select {
                background: rgba(0,0,0,0.4);
                border: 2px solid rgba(255,255,255,0.1);
                border-radius: 12px;
                padding: 14px 18px;
                color: #fff;
                font-size: 1rem;
                transition: all 0.3s ease;
            }

            .wizard-input:focus,
            .wizard-select:focus {
                outline: none;
                border-color: #00d4ff;
                box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
            }

            .wizard-select {
                cursor: pointer;
            }

            .wizard-select option {
                background: #1a1a2e;
                color: #fff;
            }

            /* Pokemon Search */
            .pokemon-search-container {
                position: relative;
            }

            .pokemon-search-results {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(20,20,35,0.98);
                border: 2px solid rgba(0, 212, 255, 0.3);
                border-radius: 12px;
                max-height: 300px;
                overflow-y: auto;
                z-index: 100;
                display: none;
            }

            .pokemon-search-results.show {
                display: block;
            }

            .pokemon-search-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 15px;
                cursor: pointer;
                transition: background 0.2s ease;
            }

            .pokemon-search-item:hover {
                background: rgba(0, 212, 255, 0.1);
            }

            .pokemon-search-item img {
                width: 40px;
                height: 40px;
            }

            .pokemon-search-item span {
                color: #fff;
                font-weight: 500;
            }

            /* Toggle Switch */
            .wizard-toggle-group {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: rgba(0,0,0,0.3);
                padding: 15px 20px;
                border-radius: 12px;
            }

            .wizard-toggle-label {
                color: #fff;
                font-weight: 500;
            }

            .wizard-toggle {
                position: relative;
                width: 60px;
                height: 32px;
            }

            .wizard-toggle input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .wizard-toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255,255,255,0.1);
                transition: 0.3s;
                border-radius: 32px;
            }

            .wizard-toggle-slider::before {
                position: absolute;
                content: "";
                height: 24px;
                width: 24px;
                left: 4px;
                bottom: 4px;
                background: #fff;
                transition: 0.3s;
                border-radius: 50%;
            }

            .wizard-toggle input:checked + .wizard-toggle-slider {
                background: linear-gradient(135deg, #ffd700, #ff8c00);
            }

            .wizard-toggle input:checked + .wizard-toggle-slider::before {
                transform: translateX(28px);
            }

            /* Stats Editor - Circular Design */
            .stats-circular-grid {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 20px;
                margin: 30px 0;
            }

            .stat-circle-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }

            .stat-circle {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: conic-gradient(
                    var(--stat-color, #00d4ff) calc(var(--stat-percent, 0) * 1%),
                    rgba(255,255,255,0.1) 0
                );
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .stat-circle::before {
                content: '';
                position: absolute;
                width: 80px;
                height: 80px;
                background: rgba(20,20,35,1);
                border-radius: 50%;
            }

            .stat-circle-inner {
                position: relative;
                z-index: 1;
                text-align: center;
            }

            .stat-circle-value {
                font-size: 1.4rem;
                font-weight: 700;
                color: #fff;
            }

            .stat-circle-label {
                font-size: 0.7rem;
                color: #888;
                text-transform: uppercase;
            }

            .stat-inputs {
                display: flex;
                gap: 8px;
            }

            .stat-input-small {
                width: 50px;
                padding: 8px;
                text-align: center;
                background: rgba(0,0,0,0.4);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 8px;
                color: #fff;
                font-size: 0.9rem;
            }

            .stat-input-small:focus {
                outline: none;
                border-color: #00d4ff;
            }

            .stat-input-label {
                font-size: 0.6rem;
                color: #666;
                text-align: center;
            }

            /* Moves Selection - Card Style */
            .moves-card-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
            }

            .move-card {
                background: rgba(0,0,0,0.3);
                border: 2px solid rgba(255,255,255,0.1);
                border-radius: 15px;
                padding: 20px;
                transition: all 0.3s ease;
            }

            .move-card:focus-within {
                border-color: #00d4ff;
                box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
            }

            .move-card-header {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 12px;
            }

            .move-slot-number {
                width: 28px;
                height: 28px;
                background: linear-gradient(135deg, #00d4ff, #0099cc);
                border-radius: 50%;
                color: #000;
                font-weight: 700;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .move-card-title {
                color: #888;
                font-size: 0.8rem;
                text-transform: uppercase;
            }

            .move-input {
                width: 100%;
                background: transparent;
                border: none;
                border-bottom: 2px solid rgba(255,255,255,0.2);
                color: #fff;
                font-size: 1.1rem;
                padding: 8px 0;
            }

            .move-input:focus {
                outline: none;
                border-bottom-color: #00d4ff;
            }

            /* Navigation Buttons */
            .wizard-nav {
                display: flex;
                justify-content: space-between;
                margin-top: 40px;
                padding-top: 30px;
                border-top: 1px solid rgba(255,255,255,0.1);
            }

            .wizard-btn {
                padding: 15px 35px;
                border-radius: 30px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .wizard-btn-back {
                background: transparent;
                border: 2px solid rgba(255,255,255,0.2);
                color: #888;
            }

            .wizard-btn-back:hover {
                border-color: #fff;
                color: #fff;
            }

            .wizard-btn-next {
                background: linear-gradient(135deg, #00d4ff, #0099cc);
                border: none;
                color: #000;
            }

            .wizard-btn-next:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
            }

            .wizard-btn-complete {
                background: linear-gradient(135deg, #00ff88, #00cc66);
                border: none;
                color: #000;
            }

            .wizard-btn-complete:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 30px rgba(0, 255, 136, 0.4);
            }

            /* Quick Actions */
            .quick-actions {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }

            .quick-action-btn {
                padding: 8px 15px;
                background: rgba(0, 212, 255, 0.1);
                border: 1px solid rgba(0, 212, 255, 0.3);
                border-radius: 20px;
                color: #00d4ff;
                font-size: 0.8rem;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .quick-action-btn:hover {
                background: rgba(0, 212, 255, 0.2);
            }

            /* EV Total Bar */
            .ev-total-bar {
                margin-top: 20px;
                padding: 15px;
                background: rgba(0,0,0,0.3);
                border-radius: 12px;
            }

            .ev-total-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
            }

            .ev-total-label {
                color: #888;
                font-size: 0.85rem;
            }

            .ev-total-value {
                color: #fff;
                font-weight: 600;
            }

            .ev-total-value.warning {
                color: #ff6b6b;
            }

            .ev-total-progress {
                height: 8px;
                background: rgba(255,255,255,0.1);
                border-radius: 4px;
                overflow: hidden;
            }

            .ev-total-fill {
                height: 100%;
                background: linear-gradient(90deg, #00d4ff, #00ff88);
                transition: width 0.3s ease;
            }

            .ev-total-fill.warning {
                background: linear-gradient(90deg, #ff6b6b, #ff4444);
            }

            /* Trade Output */
            .trade-output {
                background: rgba(0,0,0,0.5);
                border: 2px solid rgba(0, 212, 255, 0.3);
                border-radius: 15px;
                padding: 20px;
                margin-top: 20px;
            }

            .trade-output-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }

            .trade-output-title {
                color: #00d4ff;
                font-weight: 600;
            }

            .trade-output-copy {
                padding: 8px 15px;
                background: #00d4ff;
                border: none;
                border-radius: 20px;
                color: #000;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .trade-output-copy:hover {
                transform: scale(1.05);
            }

            .trade-output-code {
                background: rgba(0,0,0,0.4);
                padding: 15px;
                border-radius: 10px;
                font-family: monospace;
                color: #00ff88;
                font-size: 0.9rem;
                word-break: break-all;
            }

            /* Responsive */
            @media (max-width: 900px) {
                .wizard-main {
                    flex-direction: column;
                }

                .wizard-preview {
                    width: 100%;
                    position: relative;
                    top: 0;
                }

                .wizard-form-grid {
                    grid-template-columns: 1fr;
                }

                .moves-card-grid {
                    grid-template-columns: 1fr;
                }

                .stats-circular-grid {
                    gap: 15px;
                }

                .stat-circle {
                    width: 80px;
                    height: 80px;
                }

                .stat-circle::before {
                    width: 65px;
                    height: 65px;
                }

                .wizard-progress {
                    padding: 15px 20px;
                }

                .wizard-step-ball {
                    width: 40px;
                    height: 40px;
                }

                .wizard-step-ball::before {
                    width: 14px;
                    height: 14px;
                    border-width: 3px;
                }

                .wizard-step-label {
                    font-size: 0.65rem;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    createWizardUI() {
        const container = document.getElementById('pokemon-creator-container');
        if (!container) return;

        container.innerHTML = `
            <div class="pkm-wizard-container">
                <!-- Progress Bar -->
                <div class="wizard-progress">
                    <div class="wizard-progress-fill" id="progress-fill" style="width: 0%;"></div>
                    ${this.createProgressSteps()}
                </div>

                <!-- Main Content -->
                <div class="wizard-main">
                    <!-- Floating Preview -->
                    <div class="wizard-preview">
                        <div class="preview-sprite-container">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                                 alt="Pokemon" class="preview-sprite" id="preview-sprite">
                        </div>
                        <div class="preview-name" id="preview-name">Select a Pokemon</div>
                        <div class="preview-level" id="preview-level">Lv. 100</div>
                        <div class="preview-badges" id="preview-badges"></div>
                        <div class="preview-stats">
                            <div class="preview-stat">
                                <div class="preview-stat-label">Nature</div>
                                <div class="preview-stat-value" id="preview-nature">Adamant</div>
                            </div>
                            <div class="preview-stat">
                                <div class="preview-stat-label">Ability</div>
                                <div class="preview-stat-value" id="preview-ability">-</div>
                            </div>
                            <div class="preview-stat">
                                <div class="preview-stat-label">Item</div>
                                <div class="preview-stat-value" id="preview-item">-</div>
                            </div>
                            <div class="preview-stat">
                                <div class="preview-stat-label">Ball</div>
                                <div class="preview-stat-value" id="preview-ball">Poke</div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 1: Choose Pokemon -->
                    ${this.createStep1()}

                    <!-- Step 2: Basic Details -->
                    ${this.createStep2()}

                    <!-- Step 3: Stats -->
                    ${this.createStep3()}

                    <!-- Step 4: Moves -->
                    ${this.createStep4()}

                    <!-- Step 5: Finalize -->
                    ${this.createStep5()}
                </div>
            </div>
        `;

        this.updateProgress();
    }

    createProgressSteps() {
        const steps = [
            { num: 1, label: 'Pokemon' },
            { num: 2, label: 'Details' },
            { num: 3, label: 'Stats' },
            { num: 4, label: 'Moves' },
            { num: 5, label: 'Finalize' }
        ];

        return steps.map(step => `
            <div class="wizard-step-indicator ${step.num === 1 ? 'active' : ''}" data-step="${step.num}">
                <div class="wizard-step-ball ${step.num === 1 ? 'active' : ''}"></div>
                <span class="wizard-step-label">${step.label}</span>
            </div>
        `).join('');
    }

    createStep1() {
        return `
            <div class="wizard-step-content active" id="step-1">
                <div class="step-header">
                    <span class="step-number">1</span>
                    <h2 class="step-title">Choose Your Pokemon</h2>
                    <p class="step-subtitle">Search and select the Pokemon you want to create</p>
                </div>

                <div class="wizard-form-grid single">
                    <div class="wizard-form-group">
                        <label class="wizard-label">Game Version</label>
                        <select class="wizard-select" id="wizard-game">
                            <option value="za">Legends: Z-A</option>
                            <option value="sv" selected>Scarlet / Violet</option>
                            <option value="swsh">Sword / Shield</option>
                            <option value="bdsp">Brilliant Diamond / Shining Pearl</option>
                            <option value="pla">Legends: Arceus</option>
                            <option value="lgpe">Let's Go Pikachu/Eevee</option>
                        </select>
                    </div>

                    <div class="wizard-form-group pokemon-search-container">
                        <label class="wizard-label">Pokemon Name</label>
                        <input type="text" class="wizard-input" id="wizard-pokemon-search"
                               placeholder="Type to search... (e.g., Pikachu, Charizard)" autocomplete="off">
                        <div class="pokemon-search-results" id="pokemon-search-results"></div>
                    </div>

                    <div class="wizard-form-group">
                        <label class="wizard-label">Nickname (Optional)</label>
                        <input type="text" class="wizard-input" id="wizard-nickname"
                               placeholder="Give your Pokemon a nickname">
                    </div>
                </div>

                <div class="wizard-nav">
                    <div></div>
                    <button class="wizard-btn wizard-btn-next" onclick="pokemonWizard.nextStep()">
                        Continue <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    createStep2() {
        return `
            <div class="wizard-step-content" id="step-2">
                <div class="step-header">
                    <span class="step-number">2</span>
                    <h2 class="step-title">Basic Details</h2>
                    <p class="step-subtitle">Configure level, nature, ability, and more</p>
                </div>

                <div class="wizard-form-grid">
                    <div class="wizard-form-group">
                        <label class="wizard-label">Level</label>
                        <input type="number" class="wizard-input" id="wizard-level"
                               value="100" min="1" max="100">
                    </div>

                    <div class="wizard-form-group">
                        <label class="wizard-label">Nature</label>
                        <select class="wizard-select" id="wizard-nature">
                            ${this.natures.map(n => `
                                <option value="${n.name}" ${n.name === 'Adamant' ? 'selected' : ''}>
                                    ${n.name}${n.plus ? ` (+${n.plus}, -${n.minus})` : ' (Neutral)'}
                                </option>
                            `).join('')}
                        </select>
                    </div>

                    <div class="wizard-form-group">
                        <label class="wizard-label">Ability</label>
                        <select class="wizard-select" id="wizard-ability">
                            <option value="">Select Pokemon first</option>
                        </select>
                    </div>

                    <div class="wizard-form-group">
                        <label class="wizard-label">Held Item</label>
                        <input type="text" class="wizard-input" id="wizard-item"
                               placeholder="e.g., Leftovers, Choice Band">
                    </div>

                    <div class="wizard-form-group">
                        <label class="wizard-label">Pokeball</label>
                        <select class="wizard-select" id="wizard-pokeball">
                            ${this.pokeballs.map(ball => `
                                <option value="${ball}">${ball}</option>
                            `).join('')}
                        </select>
                    </div>

                    <div class="wizard-form-group">
                        <label class="wizard-label">Tera Type</label>
                        <select class="wizard-select" id="wizard-tera">
                            ${this.teraTypes.map(type => `
                                <option value="${type}">${type}</option>
                            `).join('')}
                        </select>
                    </div>

                    <div class="wizard-form-group full-width">
                        <div class="wizard-toggle-group">
                            <span class="wizard-toggle-label">✨ Shiny Pokemon</span>
                            <label class="wizard-toggle">
                                <input type="checkbox" id="wizard-shiny">
                                <span class="wizard-toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="wizard-nav">
                    <button class="wizard-btn wizard-btn-back" onclick="pokemonWizard.prevStep()">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                    <button class="wizard-btn wizard-btn-next" onclick="pokemonWizard.nextStep()">
                        Continue <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    createStep3() {
        const stats = [
            { key: 'hp', name: 'HP', color: '#ff5555' },
            { key: 'atk', name: 'ATK', color: '#ff8800' },
            { key: 'def', name: 'DEF', color: '#ffcc00' },
            { key: 'spa', name: 'SPA', color: '#00d4ff' },
            { key: 'spd', name: 'SPD', color: '#00ff88' },
            { key: 'spe', name: 'SPE', color: '#ff66aa' }
        ];

        return `
            <div class="wizard-step-content" id="step-3">
                <div class="step-header">
                    <span class="step-number">3</span>
                    <h2 class="step-title">Stats Configuration</h2>
                    <p class="step-subtitle">Set IVs and EVs for your Pokemon</p>
                </div>

                <div class="quick-actions">
                    <button class="quick-action-btn" onclick="pokemonWizard.maxIVs()">Max All IVs (31)</button>
                    <button class="quick-action-btn" onclick="pokemonWizard.resetEVs()">Reset EVs</button>
                    <button class="quick-action-btn" onclick="pokemonWizard.competitiveSpread()">Competitive Spread</button>
                </div>

                <div class="stats-circular-grid">
                    ${stats.map(stat => `
                        <div class="stat-circle-container">
                            <div class="stat-circle" id="circle-${stat.key}" style="--stat-color: ${stat.color}; --stat-percent: 100;">
                                <div class="stat-circle-inner">
                                    <div class="stat-circle-value" id="total-${stat.key}">31</div>
                                    <div class="stat-circle-label">${stat.name}</div>
                                </div>
                            </div>
                            <div class="stat-inputs">
                                <div>
                                    <input type="number" class="stat-input-small iv-input" id="iv-${stat.key}"
                                           value="31" min="0" max="31" data-stat="${stat.key}">
                                    <div class="stat-input-label">IV</div>
                                </div>
                                <div>
                                    <input type="number" class="stat-input-small ev-input" id="ev-${stat.key}"
                                           value="0" min="0" max="252" data-stat="${stat.key}">
                                    <div class="stat-input-label">EV</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="ev-total-bar">
                    <div class="ev-total-header">
                        <span class="ev-total-label">EV Total</span>
                        <span class="ev-total-value" id="ev-total-value">0 / 510</span>
                    </div>
                    <div class="ev-total-progress">
                        <div class="ev-total-fill" id="ev-total-fill" style="width: 0%;"></div>
                    </div>
                </div>

                <div class="wizard-nav">
                    <button class="wizard-btn wizard-btn-back" onclick="pokemonWizard.prevStep()">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                    <button class="wizard-btn wizard-btn-next" onclick="pokemonWizard.nextStep()">
                        Continue <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    createStep4() {
        return `
            <div class="wizard-step-content" id="step-4">
                <div class="step-header">
                    <span class="step-number">4</span>
                    <h2 class="step-title">Moveset</h2>
                    <p class="step-subtitle">Choose up to 4 moves for your Pokemon</p>
                </div>

                <div class="moves-card-grid">
                    ${[1, 2, 3, 4].map(num => `
                        <div class="move-card">
                            <div class="move-card-header">
                                <span class="move-slot-number">${num}</span>
                                <span class="move-card-title">Move Slot ${num}</span>
                            </div>
                            <input type="text" class="move-input" id="wizard-move-${num}"
                                   placeholder="Enter move name..." data-slot="${num}">
                        </div>
                    `).join('')}
                </div>

                <div class="wizard-nav">
                    <button class="wizard-btn wizard-btn-back" onclick="pokemonWizard.prevStep()">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                    <button class="wizard-btn wizard-btn-next" onclick="pokemonWizard.nextStep()">
                        Continue <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    createStep5() {
        return `
            <div class="wizard-step-content" id="step-5">
                <div class="step-header">
                    <span class="step-number">5</span>
                    <h2 class="step-title">Finalize & Trade</h2>
                    <p class="step-subtitle">Review your Pokemon and generate the trade command</p>
                </div>

                <div class="wizard-form-grid">
                    <div class="wizard-form-group">
                        <label class="wizard-label">OT Name</label>
                        <input type="text" class="wizard-input" id="wizard-ot-name" value="PKM-Universe">
                    </div>
                    <div class="wizard-form-group">
                        <label class="wizard-label">TID</label>
                        <input type="text" class="wizard-input" id="wizard-tid" value="000000">
                    </div>
                </div>

                <div class="trade-output">
                    <div class="trade-output-header">
                        <span class="trade-output-title">Discord Command</span>
                        <button class="trade-output-copy" onclick="pokemonWizard.copyCommand()">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                    <div class="trade-output-code" id="trade-command">
                        /pkhex create pokemon:Pikachu
                    </div>
                </div>

                <div class="wizard-nav">
                    <button class="wizard-btn wizard-btn-back" onclick="pokemonWizard.prevStep()">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                    <button class="wizard-btn wizard-btn-complete" onclick="pokemonWizard.openDiscord()">
                        <i class="fab fa-discord"></i> Trade on Discord
                    </button>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Pokemon search
        const searchInput = document.getElementById('wizard-pokemon-search');
        const searchResults = document.getElementById('pokemon-search-results');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.searchPokemon(e.target.value));
            searchInput.addEventListener('focus', () => {
                if (searchInput.value.length >= 2) {
                    searchResults.classList.add('show');
                }
            });
        }

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.pokemon-search-container')) {
                searchResults?.classList.remove('show');
            }
        });

        // Step indicators click
        document.querySelectorAll('.wizard-step-indicator').forEach(indicator => {
            indicator.addEventListener('click', () => {
                const step = parseInt(indicator.dataset.step);
                if (step <= this.currentStep) {
                    this.goToStep(step);
                }
            });
        });

        // Form change listeners
        this.bindFormListeners();

        // IV/EV inputs
        document.querySelectorAll('.iv-input, .ev-input').forEach(input => {
            input.addEventListener('input', () => this.updateStatsDisplay());
        });
    }

    bindFormListeners() {
        const elements = {
            'wizard-game': 'game',
            'wizard-level': 'level',
            'wizard-nature': 'nature',
            'wizard-item': 'heldItem',
            'wizard-pokeball': 'pokeball',
            'wizard-tera': 'teraType',
            'wizard-shiny': 'shiny',
            'wizard-nickname': 'nickname'
        };

        Object.entries(elements).forEach(([id, prop]) => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', () => {
                    if (el.type === 'checkbox') {
                        this.pokemon[prop] = el.checked;
                    } else {
                        this.pokemon[prop] = el.value;
                    }
                    this.updatePreview();
                    this.updateTradeCommand();
                });
            }
        });

        // Move inputs
        [1, 2, 3, 4].forEach(num => {
            const input = document.getElementById(`wizard-move-${num}`);
            if (input) {
                input.addEventListener('input', () => {
                    this.pokemon.moves[num - 1] = input.value;
                    this.updateTradeCommand();
                });
            }
        });
    }

    async searchPokemon(query) {
        const results = document.getElementById('pokemon-search-results');
        if (!results) return;

        if (query.length < 2) {
            results.classList.remove('show');
            return;
        }

        try {
            // Use PokeAPI to search
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
            const data = await response.json();

            const matches = data.results.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 8);

            if (matches.length > 0) {
                results.innerHTML = matches.map(p => {
                    const id = p.url.split('/').filter(Boolean).pop();
                    return `
                        <div class="pokemon-search-item" data-name="${p.name}" data-id="${id}">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"
                                 alt="${p.name}" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'">
                            <span>${this.capitalize(p.name)}</span>
                        </div>
                    `;
                }).join('');

                results.querySelectorAll('.pokemon-search-item').forEach(item => {
                    item.addEventListener('click', () => this.selectPokemon(item.dataset.name, item.dataset.id));
                });

                results.classList.add('show');
            } else {
                results.classList.remove('show');
            }
        } catch (error) {
            console.error('Search error:', error);
        }
    }

    async selectPokemon(name, id) {
        this.pokemon.species = this.capitalize(name);
        this.pokemon.speciesId = parseInt(id);

        document.getElementById('wizard-pokemon-search').value = this.pokemon.species;
        document.getElementById('pokemon-search-results').classList.remove('show');

        // Fetch pokemon data for abilities
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();

            // Update abilities dropdown
            const abilitySelect = document.getElementById('wizard-ability');
            if (abilitySelect) {
                abilitySelect.innerHTML = data.abilities.map(a =>
                    `<option value="${this.capitalize(a.ability.name)}">${this.capitalize(a.ability.name)}${a.is_hidden ? ' (Hidden)' : ''}</option>`
                ).join('');
                this.pokemon.ability = this.capitalize(data.abilities[0].ability.name);
            }
        } catch (error) {
            console.error('Error fetching pokemon data:', error);
        }

        this.updatePreview();
        this.updateTradeCommand();
    }

    updatePreview() {
        const sprite = document.getElementById('preview-sprite');
        const name = document.getElementById('preview-name');
        const level = document.getElementById('preview-level');
        const badges = document.getElementById('preview-badges');
        const nature = document.getElementById('preview-nature');
        const ability = document.getElementById('preview-ability');
        const item = document.getElementById('preview-item');
        const ball = document.getElementById('preview-ball');

        if (this.pokemon.speciesId) {
            const shinyPath = this.pokemon.shiny ? 'shiny/' : '';
            sprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${shinyPath}${this.pokemon.speciesId}.png`;
            sprite.classList.toggle('shiny', this.pokemon.shiny);
        }

        name.textContent = this.pokemon.nickname || this.pokemon.species || 'Select a Pokemon';
        level.textContent = `Lv. ${this.pokemon.level}`;

        let badgesHtml = '';
        if (this.pokemon.shiny) {
            badgesHtml += '<span class="preview-badge shiny">✨ Shiny</span>';
        }
        badgesHtml += `<span class="preview-badge game">${this.pokemon.game.toUpperCase()}</span>`;
        badges.innerHTML = badgesHtml;

        nature.textContent = this.pokemon.nature;
        ability.textContent = this.pokemon.ability || '-';
        item.textContent = this.pokemon.heldItem || '-';
        ball.textContent = this.pokemon.pokeball.replace(' Ball', '');
    }

    updateStatsDisplay() {
        const stats = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
        let evTotal = 0;

        stats.forEach(stat => {
            const ivInput = document.getElementById(`iv-${stat}`);
            const evInput = document.getElementById(`ev-${stat}`);
            const circle = document.getElementById(`circle-${stat}`);
            const total = document.getElementById(`total-${stat}`);

            if (ivInput && evInput) {
                const iv = parseInt(ivInput.value) || 0;
                const ev = parseInt(evInput.value) || 0;
                evTotal += ev;

                this.pokemon.ivs[stat] = iv;
                this.pokemon.evs[stat] = ev;

                // Update circle visual
                const percent = (iv / 31) * 100;
                circle.style.setProperty('--stat-percent', percent);
                total.textContent = iv;
            }
        });

        // Update EV total bar
        const evTotalValue = document.getElementById('ev-total-value');
        const evTotalFill = document.getElementById('ev-total-fill');

        if (evTotalValue && evTotalFill) {
            evTotalValue.textContent = `${evTotal} / 510`;
            evTotalFill.style.width = `${(evTotal / 510) * 100}%`;

            if (evTotal > 510) {
                evTotalValue.classList.add('warning');
                evTotalFill.classList.add('warning');
            } else {
                evTotalValue.classList.remove('warning');
                evTotalFill.classList.remove('warning');
            }
        }

        this.updateTradeCommand();
    }

    updateTradeCommand() {
        const commandEl = document.getElementById('trade-command');
        if (!commandEl) return;

        let cmd = `/pkhex create pokemon:${this.pokemon.species || 'Pikachu'}`;

        if (this.pokemon.shiny) cmd += ` shiny:True`;
        if (this.pokemon.level !== 100) cmd += ` level:${this.pokemon.level}`;
        if (this.pokemon.nature !== 'Hardy') cmd += ` nature:${this.pokemon.nature}`;
        if (this.pokemon.ability) cmd += ` ability:${this.pokemon.ability}`;
        if (this.pokemon.heldItem) cmd += ` helditem:${this.pokemon.heldItem}`;
        if (this.pokemon.teraType !== 'Normal') cmd += ` teratype:${this.pokemon.teraType}`;

        // Add moves
        this.pokemon.moves.forEach((move, i) => {
            if (move) cmd += ` move${i + 1}:${move}`;
        });

        // Add IVs if not all 31
        const ivs = this.pokemon.ivs;
        if (Object.values(ivs).some(v => v !== 31)) {
            cmd += ` ivs:${ivs.hp}/${ivs.atk}/${ivs.def}/${ivs.spa}/${ivs.spd}/${ivs.spe}`;
        }

        // Add EVs if any set
        const evs = this.pokemon.evs;
        if (Object.values(evs).some(v => v > 0)) {
            cmd += ` evs:${evs.hp}/${evs.atk}/${evs.def}/${evs.spa}/${evs.spd}/${evs.spe}`;
        }

        commandEl.textContent = cmd;
    }

    updateProgress() {
        const fill = document.getElementById('progress-fill');
        const percent = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;

        // Account for padding in progress bar
        const adjustedPercent = percent * 0.85; // Scale to fit between step indicators
        fill.style.width = `${adjustedPercent}%`;

        // Update step indicators
        document.querySelectorAll('.wizard-step-indicator').forEach((indicator, index) => {
            const step = index + 1;
            const ball = indicator.querySelector('.wizard-step-ball');

            indicator.classList.remove('active', 'completed');
            ball.classList.remove('active', 'completed');

            if (step === this.currentStep) {
                indicator.classList.add('active');
                ball.classList.add('active');
            } else if (step < this.currentStep) {
                indicator.classList.add('completed');
                ball.classList.add('completed');
            }
        });
    }

    goToStep(step) {
        document.querySelectorAll('.wizard-step-content').forEach(content => {
            content.classList.remove('active');
        });

        const targetStep = document.getElementById(`step-${step}`);
        if (targetStep) {
            targetStep.classList.add('active');
            this.currentStep = step;
            this.updateProgress();
        }
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.goToStep(this.currentStep + 1);
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.goToStep(this.currentStep - 1);
        }
    }

    maxIVs() {
        ['hp', 'atk', 'def', 'spa', 'spd', 'spe'].forEach(stat => {
            const input = document.getElementById(`iv-${stat}`);
            if (input) input.value = 31;
        });
        this.updateStatsDisplay();
    }

    resetEVs() {
        ['hp', 'atk', 'def', 'spa', 'spd', 'spe'].forEach(stat => {
            const input = document.getElementById(`ev-${stat}`);
            if (input) input.value = 0;
        });
        this.updateStatsDisplay();
    }

    competitiveSpread() {
        // Physical attacker spread: 252 Atk, 252 Spe, 4 HP
        document.getElementById('ev-hp').value = 4;
        document.getElementById('ev-atk').value = 252;
        document.getElementById('ev-def').value = 0;
        document.getElementById('ev-spa').value = 0;
        document.getElementById('ev-spd').value = 0;
        document.getElementById('ev-spe').value = 252;
        this.updateStatsDisplay();
    }

    copyCommand() {
        const command = document.getElementById('trade-command').textContent;
        navigator.clipboard.writeText(command).then(() => {
            const btn = document.querySelector('.trade-output-copy');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
        });
    }

    openDiscord() {
        this.copyCommand();
        window.open('https://discord.gg/pkm-universe', '_blank');
    }

    capitalize(str) {
        return str.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
}

// Initialize when DOM is ready
let pokemonWizard;
document.addEventListener('DOMContentLoaded', () => {
    pokemonWizard = new PokemonCreatorWizard();
});

// Also try to initialize if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        if (!pokemonWizard) {
            pokemonWizard = new PokemonCreatorWizard();
        }
    }, 100);
}
