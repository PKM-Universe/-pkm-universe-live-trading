/**
 * PKM-Universe Discord Integration Widget
 * Shows server stats, online members, activity feed
 */

class DiscordWidget {
    constructor() {
        // PKM-Universe Discord server ID - update this with your actual server ID
        this.serverId = '1234567890'; // Replace with actual server ID
        this.inviteCode = 'pkm-universe';

        this.serverInfo = {
            name: 'PKM-Universe',
            description: 'The ultimate Pokemon trading community!',
            memberCount: 15000,
            onlineCount: 2500,
            boostLevel: 3,
            boostCount: 45
        };

        this.recentActivity = [];
        this.channels = [
            { name: 'general-chat', id: '1', messages: 1250 },
            { name: 'trade-requests', id: '2', messages: 3400 },
            { name: 'shiny-showcase', id: '3', messages: 890 },
            { name: 'giveaways', id: '4', messages: 560 },
            { name: 'bot-commands', id: '5', messages: 8900 }
        ];

        this.init();
    }

    init() {
        this.injectStyles();
        this.createWidget();
        this.startActivitySimulation();
    }

    injectStyles() {
        if (document.getElementById('discord-widget-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'discord-widget-styles';
        styles.textContent = `
            .discord-widget {
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                border-radius: 20px;
                padding: 30px;
                margin: 20px 0;
                border: 2px solid #5865f2;
                box-shadow: 0 10px 40px rgba(88, 101, 242, 0.2);
            }

            .dw-header {
                display: flex;
                align-items: center;
                gap: 20px;
                margin-bottom: 25px;
            }

            .dw-server-icon {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: linear-gradient(135deg, #5865f2, #7289da);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                color: #fff;
                box-shadow: 0 5px 20px rgba(88, 101, 242, 0.4);
            }

            .dw-server-info {
                flex: 1;
            }

            .dw-server-name {
                font-family: 'Orbitron', sans-serif;
                font-size: 1.8rem;
                color: #5865f2;
                margin: 0 0 5px;
            }

            .dw-server-description {
                color: #888;
                font-size: 0.9rem;
                margin: 0;
            }

            .dw-join-btn {
                padding: 12px 30px;
                border-radius: 25px;
                border: none;
                background: linear-gradient(135deg, #5865f2, #7289da);
                color: #fff;
                font-weight: bold;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .dw-join-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 5px 25px rgba(88, 101, 242, 0.5);
            }

            .dw-stats-row {
                display: flex;
                gap: 20px;
                margin-bottom: 25px;
                flex-wrap: wrap;
            }

            .dw-stat-card {
                flex: 1;
                min-width: 150px;
                background: rgba(88, 101, 242, 0.1);
                border-radius: 15px;
                padding: 20px;
                text-align: center;
                transition: all 0.3s ease;
            }

            .dw-stat-card:hover {
                transform: translateY(-3px);
                background: rgba(88, 101, 242, 0.2);
            }

            .dw-stat-icon {
                font-size: 2rem;
                margin-bottom: 10px;
            }

            .dw-stat-value {
                font-family: 'Orbitron', sans-serif;
                font-size: 1.8rem;
                color: #5865f2;
                margin-bottom: 5px;
            }

            .dw-stat-label {
                color: #888;
                font-size: 0.85rem;
            }

            .dw-online-indicator {
                display: inline-block;
                width: 10px;
                height: 10px;
                background: #3ba55d;
                border-radius: 50%;
                margin-right: 5px;
                animation: pulse-online 2s infinite;
            }

            @keyframes pulse-online {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            .dw-main {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 25px;
            }

            @media (max-width: 900px) {
                .dw-main {
                    grid-template-columns: 1fr;
                }
            }

            .dw-section {
                background: rgba(0, 0, 0, 0.3);
                border-radius: 15px;
                padding: 20px;
            }

            .dw-section-title {
                font-weight: bold;
                color: #5865f2;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            /* Activity Feed */
            .dw-activity-feed {
                max-height: 300px;
                overflow-y: auto;
            }

            .dw-activity-item {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 12px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                animation: slideIn 0.3s ease;
            }

            @keyframes slideIn {
                from { opacity: 0; transform: translateX(-20px); }
                to { opacity: 1; transform: translateX(0); }
            }

            .dw-activity-item:last-child {
                border-bottom: none;
            }

            .dw-activity-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(135deg, #5865f2, #7289da);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1rem;
                color: #fff;
                flex-shrink: 0;
            }

            .dw-activity-content {
                flex: 1;
            }

            .dw-activity-user {
                font-weight: bold;
                color: #5865f2;
            }

            .dw-activity-action {
                color: #888;
                font-size: 0.9rem;
            }

            .dw-activity-time {
                color: #666;
                font-size: 0.75rem;
                margin-top: 4px;
            }

            .dw-activity-badge {
                display: inline-block;
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 0.7rem;
                font-weight: bold;
                margin-left: 5px;
            }

            .dw-badge-trade { background: #00d4ff; color: #000; }
            .dw-badge-shiny { background: #ffd700; color: #000; }
            .dw-badge-giveaway { background: #e74c3c; color: #fff; }
            .dw-badge-level { background: #2ecc71; color: #fff; }

            /* Channels List */
            .dw-channels-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .dw-channel {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 15px;
                border-radius: 8px;
                margin-bottom: 5px;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .dw-channel:hover {
                background: rgba(88, 101, 242, 0.2);
            }

            .dw-channel-icon {
                color: #888;
            }

            .dw-channel-name {
                flex: 1;
                color: #ccc;
            }

            .dw-channel-badge {
                background: #5865f2;
                color: #fff;
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 0.75rem;
                font-weight: bold;
            }

            /* Online Members Preview */
            .dw-members-preview {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }

            .dw-member {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 20px;
                transition: all 0.2s ease;
            }

            .dw-member:hover {
                background: rgba(88, 101, 242, 0.2);
            }

            .dw-member-avatar {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: linear-gradient(135deg, #5865f2, #7289da);
                position: relative;
            }

            .dw-member-avatar::after {
                content: '';
                position: absolute;
                bottom: -2px;
                right: -2px;
                width: 10px;
                height: 10px;
                background: #3ba55d;
                border-radius: 50%;
                border: 2px solid #1a1a2e;
            }

            .dw-member-name {
                color: #ccc;
                font-size: 0.85rem;
            }

            .dw-member-role {
                font-size: 0.7rem;
                padding: 2px 6px;
                border-radius: 8px;
            }

            .dw-role-admin { background: #e74c3c; color: #fff; }
            .dw-role-mod { background: #3498db; color: #fff; }
            .dw-role-helper { background: #2ecc71; color: #fff; }
            .dw-role-booster { background: #f47fff; color: #fff; }

            /* Boost Section */
            .dw-boost-section {
                background: linear-gradient(135deg, rgba(244, 127, 255, 0.1), rgba(244, 127, 255, 0.05));
                border-radius: 15px;
                padding: 20px;
                margin-top: 25px;
                border: 1px solid rgba(244, 127, 255, 0.3);
            }

            .dw-boost-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 15px;
            }

            .dw-boost-title {
                display: flex;
                align-items: center;
                gap: 10px;
                color: #f47fff;
                font-weight: bold;
            }

            .dw-boost-level {
                background: linear-gradient(135deg, #f47fff, #b347bf);
                color: #fff;
                padding: 4px 12px;
                border-radius: 15px;
                font-weight: bold;
                font-size: 0.9rem;
            }

            .dw-boost-bar {
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                overflow: hidden;
            }

            .dw-boost-fill {
                height: 100%;
                background: linear-gradient(90deg, #f47fff, #b347bf);
                border-radius: 4px;
                transition: width 0.5s ease;
            }

            .dw-boost-info {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                font-size: 0.85rem;
                color: #888;
            }

            /* Events Section */
            .dw-events-list {
                margin-top: 10px;
            }

            .dw-event {
                display: flex;
                gap: 15px;
                padding: 15px;
                background: rgba(88, 101, 242, 0.1);
                border-radius: 10px;
                margin-bottom: 10px;
            }

            .dw-event-date {
                text-align: center;
                min-width: 50px;
            }

            .dw-event-day {
                font-family: 'Orbitron', sans-serif;
                font-size: 1.5rem;
                color: #5865f2;
            }

            .dw-event-month {
                font-size: 0.75rem;
                color: #888;
                text-transform: uppercase;
            }

            .dw-event-info h4 {
                color: #fff;
                margin: 0 0 5px;
            }

            .dw-event-info p {
                color: #888;
                font-size: 0.85rem;
                margin: 0;
            }

            .dw-event-interested {
                font-size: 0.75rem;
                color: #5865f2;
                margin-top: 8px;
            }
        `;
        document.head.appendChild(styles);
    }

    createWidget() {
        const container = document.createElement('div');
        container.id = 'discord-widget-container';
        container.innerHTML = `
            <div class="discord-widget">
                <div class="dw-header">
                    <div class="dw-server-icon">
                        <i class="fab fa-discord"></i>
                    </div>
                    <div class="dw-server-info">
                        <h2 class="dw-server-name">${this.serverInfo.name}</h2>
                        <p class="dw-server-description">${this.serverInfo.description}</p>
                    </div>
                    <a href="https://discord.gg/${this.inviteCode}" target="_blank" class="dw-join-btn">
                        <i class="fab fa-discord"></i> Join Server
                    </a>
                </div>

                <div class="dw-stats-row">
                    <div class="dw-stat-card">
                        <div class="dw-stat-icon">
                            <i class="fas fa-users" style="color: #5865f2;"></i>
                        </div>
                        <div class="dw-stat-value" id="dw-member-count">${this.formatNumber(this.serverInfo.memberCount)}</div>
                        <div class="dw-stat-label">Total Members</div>
                    </div>
                    <div class="dw-stat-card">
                        <div class="dw-stat-icon">
                            <span class="dw-online-indicator"></span>
                            <i class="fas fa-circle" style="color: #3ba55d;"></i>
                        </div>
                        <div class="dw-stat-value" id="dw-online-count">${this.formatNumber(this.serverInfo.onlineCount)}</div>
                        <div class="dw-stat-label">Online Now</div>
                    </div>
                    <div class="dw-stat-card">
                        <div class="dw-stat-icon">
                            <i class="fas fa-exchange-alt" style="color: #00d4ff;"></i>
                        </div>
                        <div class="dw-stat-value" id="dw-trades-today">1,247</div>
                        <div class="dw-stat-label">Trades Today</div>
                    </div>
                    <div class="dw-stat-card">
                        <div class="dw-stat-icon">
                            <i class="fas fa-gift" style="color: #e74c3c;"></i>
                        </div>
                        <div class="dw-stat-value" id="dw-giveaways">3</div>
                        <div class="dw-stat-label">Active Giveaways</div>
                    </div>
                </div>

                <div class="dw-main">
                    <!-- Activity Feed -->
                    <div class="dw-section">
                        <h3 class="dw-section-title">
                            <i class="fas fa-bolt"></i> Live Activity
                        </h3>
                        <div class="dw-activity-feed" id="dw-activity-feed">
                            <div style="color: #666; text-align: center; padding: 20px;">Loading activity...</div>
                        </div>
                    </div>

                    <!-- Channels & Members -->
                    <div class="dw-section">
                        <h3 class="dw-section-title">
                            <i class="fas fa-hashtag"></i> Popular Channels
                        </h3>
                        <ul class="dw-channels-list" id="dw-channels-list">
                            ${this.channels.map(ch => `
                                <li class="dw-channel">
                                    <span class="dw-channel-icon">#</span>
                                    <span class="dw-channel-name">${ch.name}</span>
                                    <span class="dw-channel-badge">${this.formatNumber(ch.messages)}</span>
                                </li>
                            `).join('')}
                        </ul>

                        <h3 class="dw-section-title" style="margin-top: 25px;">
                            <i class="fas fa-user-circle"></i> Online Members
                        </h3>
                        <div class="dw-members-preview" id="dw-members-preview">
                            ${this.generateSampleMembers()}
                        </div>
                    </div>
                </div>

                <!-- Boost Section -->
                <div class="dw-boost-section">
                    <div class="dw-boost-header">
                        <div class="dw-boost-title">
                            <i class="fas fa-rocket"></i> Server Boosts
                        </div>
                        <span class="dw-boost-level">Level ${this.serverInfo.boostLevel}</span>
                    </div>
                    <div class="dw-boost-bar">
                        <div class="dw-boost-fill" style="width: ${(this.serverInfo.boostCount % 14) / 14 * 100}%;"></div>
                    </div>
                    <div class="dw-boost-info">
                        <span>${this.serverInfo.boostCount} boosts</span>
                        <span>${14 - (this.serverInfo.boostCount % 14)} more for Level ${this.serverInfo.boostLevel + 1}</span>
                    </div>
                </div>

                <!-- Upcoming Events -->
                <div class="dw-section" style="margin-top: 25px;">
                    <h3 class="dw-section-title">
                        <i class="fas fa-calendar-alt"></i> Upcoming Events
                    </h3>
                    <div class="dw-events-list">
                        ${this.generateUpcomingEvents()}
                    </div>
                </div>
            </div>
        `;

        // Find insertion point
        const targetSection = document.querySelector('#mystery-box-container') ||
                             document.querySelector('.live-trading-section');

        if (targetSection) {
            targetSection.parentNode.insertBefore(container, targetSection.nextSibling);
        } else {
            document.body.appendChild(container);
        }

        this.updateActivityFeed();
    }

    generateSampleMembers() {
        const members = [
            { name: 'Eric', role: 'admin' },
            { name: 'TrainerRed', role: 'mod' },
            { name: 'ShinyHunter', role: 'helper' },
            { name: 'PokeCollector', role: 'booster' },
            { name: 'GottaCatchEmAll', role: null },
            { name: 'MasterTrader', role: null },
            { name: 'LegendarySeeker', role: null },
            { name: 'CompetitiveKing', role: null }
        ];

        return members.map(m => `
            <div class="dw-member">
                <div class="dw-member-avatar"></div>
                <span class="dw-member-name">${m.name}</span>
                ${m.role ? `<span class="dw-member-role dw-role-${m.role}">${m.role}</span>` : ''}
            </div>
        `).join('');
    }

    generateUpcomingEvents() {
        const events = [
            {
                day: 15,
                month: 'Dec',
                title: 'Shiny Legendary Giveaway',
                desc: 'Win a chance to get shiny legendary Pokemon!',
                interested: 847
            },
            {
                day: 20,
                month: 'Dec',
                title: 'Community Trade Day',
                desc: 'Special day with boosted trade rewards and bonuses.',
                interested: 1203
            },
            {
                day: 25,
                month: 'Dec',
                title: 'Holiday Special Event',
                desc: 'Exclusive holiday Pokemon and mystery boxes!',
                interested: 2156
            }
        ];

        return events.map(e => `
            <div class="dw-event">
                <div class="dw-event-date">
                    <div class="dw-event-day">${e.day}</div>
                    <div class="dw-event-month">${e.month}</div>
                </div>
                <div class="dw-event-info">
                    <h4>${e.title}</h4>
                    <p>${e.desc}</p>
                    <div class="dw-event-interested">
                        <i class="fas fa-star"></i> ${this.formatNumber(e.interested)} interested
                    </div>
                </div>
            </div>
        `).join('');
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    startActivitySimulation() {
        // Generate initial activity
        this.generateInitialActivity();

        // Add new activity periodically
        setInterval(() => {
            this.addRandomActivity();
        }, 5000 + Math.random() * 10000);

        // Update online count periodically
        setInterval(() => {
            this.updateOnlineCount();
        }, 30000);
    }

    generateInitialActivity() {
        const activities = [
            { type: 'trade', user: 'ShinyMaster', action: 'completed a trade for', target: 'Shiny Charizard', badge: 'trade' },
            { type: 'shiny', user: 'LuckyTrainer', action: 'found a', target: 'Shiny Rayquaza', badge: 'shiny' },
            { type: 'giveaway', user: 'GiveawayKing', action: 'started a giveaway for', target: 'Legendary Bundle', badge: 'giveaway' },
            { type: 'trade', user: 'CompetitiveAce', action: 'traded', target: '5 Pokemon', badge: 'trade' },
            { type: 'level', user: 'Dedicated101', action: 'reached', target: 'Level 50', badge: 'level' }
        ];

        this.recentActivity = activities.map((a, i) => ({
            ...a,
            time: new Date(Date.now() - (i * 60000 * (Math.random() * 5 + 1)))
        }));

        this.updateActivityFeed();
    }

    addRandomActivity() {
        const activityTypes = [
            { type: 'trade', actions: ['completed a trade for', 'traded', 'received'], targets: ['Shiny Pikachu', 'Legendary Mewtwo', 'Rare Ditto', 'Event Pokemon', 'Competitive Team'] },
            { type: 'shiny', actions: ['found a', 'caught a', 'hatched a'], targets: ['Shiny Eevee', 'Shiny Gyarados', 'Shiny Magikarp', 'Shiny Ponyta', 'Shiny Gengar'] },
            { type: 'giveaway', actions: ['entered the', 'won the', 'started a'], targets: ['Mystery Giveaway', 'Shiny Bundle', 'Legendary Set', 'Starter Pack'] },
            { type: 'level', actions: ['reached', 'leveled up to', 'achieved'], targets: ['Level 10', 'Level 25', 'Level 50', 'Level 100', 'Elite Status'] }
        ];

        const usernames = ['PokeTrainer', 'ShinySeeker', 'LegendHunter', 'CompetitivePro', 'CasualFan', 'CollectorMax', 'TradeKing', 'MysteryLover', 'GottaCatch', 'EliteTrainer'];

        const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
        const randomUser = usernames[Math.floor(Math.random() * usernames.length)] + Math.floor(Math.random() * 1000);
        const randomAction = randomType.actions[Math.floor(Math.random() * randomType.actions.length)];
        const randomTarget = randomType.targets[Math.floor(Math.random() * randomType.targets.length)];

        const badges = { trade: 'trade', shiny: 'shiny', giveaway: 'giveaway', level: 'level' };

        const newActivity = {
            type: randomType.type,
            user: randomUser,
            action: randomAction,
            target: randomTarget,
            badge: badges[randomType.type],
            time: new Date()
        };

        this.recentActivity.unshift(newActivity);
        if (this.recentActivity.length > 10) {
            this.recentActivity.pop();
        }

        this.updateActivityFeed();
    }

    updateActivityFeed() {
        const feed = document.getElementById('dw-activity-feed');
        if (!feed) return;

        feed.innerHTML = this.recentActivity.map(a => `
            <div class="dw-activity-item">
                <div class="dw-activity-avatar">
                    ${a.user.charAt(0).toUpperCase()}
                </div>
                <div class="dw-activity-content">
                    <div>
                        <span class="dw-activity-user">${a.user}</span>
                        <span class="dw-activity-action">${a.action}</span>
                        <strong>${a.target}</strong>
                        <span class="dw-activity-badge dw-badge-${a.badge}">${a.badge}</span>
                    </div>
                    <div class="dw-activity-time">${this.formatTime(a.time)}</div>
                </div>
            </div>
        `).join('');
    }

    updateOnlineCount() {
        const variation = Math.floor(Math.random() * 200) - 100;
        this.serverInfo.onlineCount = Math.max(1000, this.serverInfo.onlineCount + variation);

        const countEl = document.getElementById('dw-online-count');
        if (countEl) {
            countEl.textContent = this.formatNumber(this.serverInfo.onlineCount);
        }
    }

    formatTime(date) {
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return date.toLocaleDateString();
    }
}

// Initialize
window.discordWidget = new DiscordWidget();
