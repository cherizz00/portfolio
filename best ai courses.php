<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Portfolio - Modern Design</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
            color: #1e293b;
            overflow-x: hidden;
            min-height: 100vh;
            line-height: 1.6;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            position: relative;
            padding: 60px 0;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border-radius: 30px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.8);
        }

        .header::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
            border-radius: 50%;
            z-index: 0;
        }

        .header-content {
            position: relative;
            z-index: 1;
        }

        .name {
            font-size: 4rem;
            font-weight: 800;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            margin-bottom: 15px;
            animation: textGlow 3s ease-in-out infinite alternate;
            letter-spacing: -2px;
        }

        @keyframes textGlow {
            from { filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.2)); }
            to { filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.3)); }
        }

        .title {
            font-size: 1.5rem;
            color: #64748b;
            margin-bottom: 30px;
            font-weight: 500;
        }

        .avatar {
            width: 120px;
            height: 120px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            border-radius: 50%;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            color: white;
            box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        .nav-tabs {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 40px;
            padding: 8px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            max-width: 600px;
            margin: 0 auto 40px;
        }

        .tab-btn {
            padding: 14px 28px;
            background: transparent;
            border: none;
            border-radius: 15px;
            color: #64748b;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 600;
            font-size: 14px;
            position: relative;
            overflow: hidden;
        }

        .tab-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
            transition: left 0.5s ease;
        }

        .tab-btn:hover::before {
            left: 100%;
        }

        .tab-btn:hover {
            color: #3b82f6;
            transform: translateY(-2px);
        }

        .tab-btn.active {
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }

        .tab-content {
            display: none;
            animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tab-content.active {
            display: block;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .dashboard {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
        }

        .card {
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.8);
            border-radius: 24px;
            padding: 30px;
            backdrop-filter: blur(20px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
        }

        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.4s ease;
        }

        .card:hover::before {
            transform: scaleX(1);
        }

        .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.1);
            border-color: rgba(59, 130, 246, 0.2);
        }

        .card-title {
            font-size: 1.5rem;
            margin-bottom: 20px;
            color: #1e293b;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 700;
        }

        .card-icon {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
        }

        .metric {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 15px 0;
            padding: 15px;
            background: rgba(248, 250, 252, 0.8);
            border-radius: 15px;
            border: 1px solid rgba(226, 232, 240, 0.5);
            transition: all 0.3s ease;
        }

        .metric:hover {
            background: rgba(59, 130, 246, 0.05);
            border-color: rgba(59, 130, 246, 0.2);
        }

        .metric-label {
            color: #64748b;
            font-weight: 500;
        }

        .metric-value {
            font-weight: 700;
            font-size: 1.1rem;
        }

        .positive { 
            color: #059669; 
            background: rgba(5, 150, 105, 0.1);
            padding: 4px 8px;
            border-radius: 8px;
        }

        .negative { 
            color: #dc2626; 
            background: rgba(220, 38, 38, 0.1);
            padding: 4px 8px;
            border-radius: 8px;
        }

        .neutral {
            color: #3b82f6;
        }

        .project-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: 30px;
        }

        .project-card {
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.8);
            border-radius: 24px;
            padding: 30px;
            backdrop-filter: blur(20px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
        }

        .project-card::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent);
            border-radius: 0 0 0 100px;
        }

        .project-card:hover {
            transform: translateY(-12px);
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.12);
            border-color: rgba(59, 130, 246, 0.3);
        }

        .project-title {
            font-size: 1.4rem;
            color: #1e293b;
            margin-bottom: 15px;
            font-weight: 700;
        }

        .project-description {
            color: #64748b;
            margin-bottom: 20px;
            line-height: 1.6;
        }

        .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 20px 0;
        }

        .tech-tag {
            background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
            color: #475569;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            border: 1px solid rgba(226, 232, 240, 0.8);
            transition: all 0.3s ease;
        }

        .tech-tag:hover {
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: white;
            transform: translateY(-2px);
        }

        .progress-container {
            margin: 20px 0;
        }

        .progress-label {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 0.9rem;
            color: #64748b;
            font-weight: 500;
        }

        .progress-bar {
            background: rgba(226, 232, 240, 0.6);
            height: 10px;
            border-radius: 10px;
            overflow: hidden;
            position: relative;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
            border-radius: 10px;
            transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }

        .progress-fill::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }

        .trading-panel {
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.8);
            border-radius: 24px;
            padding: 30px;
            margin-top: 30px;
            backdrop-filter: blur(20px);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
        }

        .panel-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 25px;
        }

        .panel-icon {
            width: 50px;
            height: 50px;
            border-radius: 15px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
        }

        .panel-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: #1e293b;
        }

        .price-ticker {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin-bottom: 25px;
        }

        .ticker-item {
            text-align: center;
            padding: 20px;
            background: rgba(248, 250, 252, 0.8);
            border-radius: 16px;
            border: 1px solid rgba(226, 232, 240, 0.5);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
        }

        .ticker-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            background: rgba(255, 255, 255, 0.9);
        }

        .ticker-symbol {
            font-weight: 800;
            color: #1e293b;
            font-size: 1.1rem;
            margin-bottom: 8px;
        }

        .ticker-price {
            font-size: 1.4rem;
            font-weight: 700;
            margin: 8px 0;
        }

        .ticker-change {
            font-size: 0.9rem;
            font-weight: 600;
        }

        .contact-form {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.9);
            padding: 40px;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
        }

        .form-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .form-title {
            font-size: 2.2rem;
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 10px;
        }

        .form-subtitle {
            color: #64748b;
            font-size: 1.1rem;
        }

        .form-group {
            margin-bottom: 25px;
        }

        .form-group label {
            display: block;
            margin-bottom: 10px;
            color: #374151;
            font-weight: 600;
            font-size: 0.95rem;
        }

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 16px 20px;
            background: rgba(248, 250, 252, 0.8);
            border: 2px solid rgba(226, 232, 240, 0.8);
            border-radius: 15px;
            color: #1e293b;
            font-size: 16px;
            transition: all 0.3s ease;
            font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #3b82f6;
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .submit-btn {
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: white;
            padding: 16px 40px;
            border: none;
            border-radius: 15px;
            cursor: pointer;
            font-weight: 700;
            font-size: 1rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
            width: 100%;
        }

        .submit-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
        }

        .contact-info {
            margin-top: 40px;
            text-align: center;
            padding: 30px;
            background: rgba(248, 250, 252, 0.6);
            border-radius: 20px;
            border: 1px solid rgba(226, 232, 240, 0.5);
        }

        .contact-info h3 {
            color: #1e293b;
            margin-bottom: 20px;
            font-weight: 700;
        }

        .contact-item {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin: 10px 20px;
            color: #64748b;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .contact-item:hover {
            color: #3b82f6;
            transform: translateY(-2px);
        }

        .floating-shapes {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        }

        .shape {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05));
            animation: floatShape 8s ease-in-out infinite;
        }

        @keyframes floatShape {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(180deg); }
        }

        @media (max-width: 768px) {
            .name { font-size: 2.8rem; }
            .dashboard { grid-template-columns: 1fr; }
            .project-grid { grid-template-columns: 1fr; }
            .nav-tabs { flex-direction: column; max-width: 300px; }
            .price-ticker { grid-template-columns: repeat(2, 1fr); }
            .contact-form { padding: 25px; margin: 0 10px; }
        }

        @media (max-width: 480px) {
            .name { font-size: 2.2rem; }
            .price-ticker { grid-template-columns: 1fr; }
            .project-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="floating-shapes" id="shapes"></div>
    
    <div class="container">
        <div class="header">
            <div class="header-content">
                <div class="avatar">👨‍💻</div>
                <h1 class="name">Alex Thompson</h1>
                <p class="title">Student Trader & Full-Stack Developer</p>
            </div>
        </div>

        <div class="nav-tabs">
            <button class="tab-btn active" data-tab="dashboard">📊 Dashboard</button>
            <button class="tab-btn" data-tab="projects">💼 Projects</button>
            <button class="tab-btn" data-tab="skills">🎯 Skills</button>
            <button class="tab-btn" data-tab="contact">📞 Contact</button>
        </div>

        <div class="tab-content active" id="dashboard">
            <div class="dashboard">
                <div class="card">
                    <div class="card-icon">📈</div>
                    <h3 class="card-title">Portfolio Performance</h3>
                    <div class="metric">
                        <span class="metric-label">Total Portfolio Value</span>
                        <span class="metric-value neutral">$15,420</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Today's P&L</span>
                        <span class="metric-value positive">+$342 (+2.3%)</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">This Week</span>
                        <span class="metric-value positive">+$678 (+4.6%)</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Success Rate</span>
                        <span class="metric-value neutral">76.8%</span>
                    </div>
                </div>

                <div class="card">
                    <div class="card-icon">🎯</div>
                    <h3 class="card-title">Trading Statistics</h3>
                    <div class="metric">
                        <span class="metric-label">Active Positions</span>
                        <span class="metric-value neutral">12</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Total Trades</span>
                        <span class="metric-value neutral">203</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Average Hold Time</span>
                        <span class="metric-value neutral">3.2 days</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Best Single Trade</span>
                        <span class="metric-value positive">+$1,240</span>
                    </div>
                </div>

                <div class="card">
                    <div class="card-icon">📚</div>
                    <h3 class="card-title">Learning Progress</h3>
                    <div class="metric">
                        <span class="metric-label">Courses Completed</span>
                        <span class="metric-value neutral">18</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Study Hours This Month</span>
                        <span class="metric-value neutral">47h</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Current Level</span>
                        <span class="metric-value neutral">Intermediate</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Next Goal</span>
                        <span class="metric-value neutral">CFA Level 1</span>
                    </div>
                </div>
            </div>

            <div class="trading-panel">
                <div class="panel-header">
                    <div class="panel-icon">📊</div>
                    <h3 class="panel-title">Live Market Overview</h3>
                </div>
                <div class="price-ticker">
                    <div class="ticker-item">
                        <div class="ticker-symbol">AAPL</div>
                        <div class="ticker-price positive">$178.24</div>
                        <div class="ticker-change positive">+2.8% ↗</div>
                    </div>
                    <div class="ticker-item">
                        <div class="ticker-symbol">TSLA</div>
                        <div class="ticker-price negative">$245.77</div>
                        <div class="ticker-change negative">-1.2% ↘</div>
                    </div>
                    <div class="ticker-item">
                        <div class="ticker-symbol">NVDA</div>
                        <div class="ticker-price positive">$445.18</div>
                        <div class="ticker-change positive">+4.1% ↗</div>
                    </div>
                    <div class="ticker-item">
                        <div class="ticker-symbol">BTC-USD</div>
                        <div class="ticker-price positive">$43,256</div>
                        <div class="ticker-change positive">+1.5% ↗</div>
                    </div>
                    <div class="ticker-item">
                        <div class="ticker-symbol">ETH-USD</div>
                        <div class="ticker-price positive">$2,678</div>
                        <div class="ticker-change positive">+3.2% ↗</div>
                    </div>
                    <div class="ticker-item">
                        <div class="ticker-symbol">SPY</div>
                        <div class="ticker-price positive">$442.18</div>
                        <div class="ticker-change positive">+0.9% ↗</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="tab-content" id="projects">
            <div class="project-grid">
                <div class="project-card">
                    <h3 class="project-title">🤖 AI Trading Bot</h3>
                    <p class="project-description">Advanced algorithmic trading bot using machine learning to analyze market patterns and execute profitable trades automatically. Features real-time data processing and risk management.</p>
                    <div class="project-tech">
                        <span class="tech-tag">Python</span>
                        <span class="tech-tag">TensorFlow</span>
                        <span class="tech-tag">Pandas</span>
                        <span class="tech-tag">Alpaca API</span>
                        <span class="tech-tag">Redis</span>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Development Progress</span>
                            <span>92%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 92%;"></div>
                        </div>
                    </div>
                </div>

                <div class="project-card">
                    <h3 class="project-title">📱 Portfolio Tracker Pro</h3>
                    <p class="project-description">Full-stack web application for comprehensive portfolio management with real-time tracking, performance analytics, and social trading features. Built with modern React and Node.js.</p>
                    <div class="project-tech">
                        <span class="tech-tag">React</span>
                        <span class="tech-tag">Node.js</span>
                        <span class="tech-tag">PostgreSQL</span>
                        <span class="tech-tag">Chart.js</span>
                        <span class="tech-tag">Socket.io</span>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Development Progress</span>
                            <span>87%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 87%;"></div>
                        </div>
                    </div>
                </div>

                <div class="project-card">
                    <h3 class="project-title">📊 Market Analytics Dashboard</h3>
                    <p class="project-description">Interactive dashboard providing comprehensive market analysis, trend visualization, and trading signals. Features advanced charting and custom indicators for technical analysis.</p>
                    <div class="project-tech">
                        <span class="tech-tag">Vue.js</span>
                        <span class="tech-tag">D3.js</span>
                        <span class="tech-tag">Express.js</span>
                        <span class="tech-tag">MongoDB</span>
                        <span class="tech-tag">WebSocket</span>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Development Progress</span>
                            <span>78%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 78%;"></div>
                        </div>
                    </div>
                </div>

                <div class="project-card">
                    <h3 class="project-title">💰 Crypto Alert System</h3>
                    <p class="project-description">Smart notification system for cryptocurrency price movements, volume spikes, and market sentiment changes. Includes mobile app integration and customizable alert triggers.</p>
                    <div class="project-tech">
                        <span class="tech-tag">React Native</span>
                        <span class="tech-tag">Firebase</span>
                        <span class="tech-tag">WebSocket</span>
                        <span class="tech-tag">Push Notifications</span>
                        <span class="tech-tag">CoinGecko API</span>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Development Progress</span>
                            <span>65%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 65%;"></div>
                        </div>
                    </div>
                </div>

                <div class="project-card">
                    <h3 class="project-title">🎯 Options Strategy Analyzer</h3>
                    <p class="project-description">Advanced options trading tool that analyzes various strategies, calculates profit/loss scenarios, and provides risk assessment. Features Greeks calculation and volatility analysis.</p>
                    <div class="project-tech">
                        <span class="tech-tag">Python</span>
                        <span class="tech-tag">NumPy</span>
                        <span class="tech-tag">SciPy</span>
                        <span class="tech-tag">Plotly</span>
                        <span class="tech-tag">FastAPI</span>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Development Progress</span>
                            <span>71%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 71%;"></div>
                        </div>
                    </div>
                </div>

                <div class="project-card">
                    <h3 class="project-title">🌐 Trading Social Network</h3>
                    <p class="project-description">Social platform for traders to share strategies, discuss market trends, and copy successful trades. Features user rankings, performance tracking, and educational content.</p>
                    <div class="project-tech">
                        <span class="tech-tag">Next.js</span>
                        <span class="tech-tag">TypeScript</span>
                        <span class="tech-tag">Prisma</span>
                        <span class="tech-tag">NextAuth</span>
                        <span class="tech-tag">Tailwind CSS</span>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Development Progress</span>
                            <span>45%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 45%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="tab-content" id="skills">
            <div class="dashboard">
                <div class="card">
                    <div class="card-icon">💻</div>
                    <h3 class="card-title">Programming Languages</h3>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>JavaScript / TypeScript</span>
                            <span>95%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 95%;"></div>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Python</span>
                            <span>90%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 90%;"></div>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>SQL</span>
                            <span>85%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 85%;"></div>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Java</span>
                            <span>75%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 75%;"></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-icon">🚀</div>
                    <h3 class="card-title">Frameworks & Tools</h3>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>React / Next.js</span>
                            <span>92%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 92%;"></div>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Node.js / Express</span>
                            <span>88%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 88%;"></div>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Docker / K8s</span>
                            <span>70%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 70%;"></div>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>AWS / Azure</span>
                            <span>65%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 65%;"></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-icon">📈</div>
                    <h3 class="card-title">Trading & Finance</h3>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Technical Analysis</span>
                            <span>88%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 88%;"></div>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Risk Management</span>
                            <span>82%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 82%;"></div>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Options Trading</span>
                            <span>68%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 68%;"></div>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Crypto Trading</span>
                            <span>75%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 75%;"></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-icon">🎓</div>
                    <h3 class="card-title">Certifications & Education</h3>
                    <div class="metric">
                        <span class="metric-label">Financial Markets (Yale)</span>
                        <span class="metric-value positive">✓ Completed</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Python for Finance</span>
                        <span class="metric-value positive">✓ Completed</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">AWS Solutions Architect</span>
                        <span class="metric-value neutral">📚 In Progress</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">CFA Level 1</span>
                        <span class="metric-value neutral">📅 Scheduled</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Bachelor's in Finance</span>
                        <span class="metric-value neutral">🎯 Final Year</span>
                    </div>
                </div>

                <div class="card">
                    <div class="card-icon">🎯</div>
                    <h3 class="card-title">Soft Skills & Languages</h3>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Problem Solving</span>
                            <span>94%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 94%;"></div>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Team Leadership</span>
                            <span>85%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 85%;"></div>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>English (Native)</span>
                            <span>100%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 100%;"></div>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Spanish (Conversational)</span>
                            <span>70%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 70%;"></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-icon">🏆</div>
                    <h3 class="card-title">Achievements & Awards</h3>
                    <div class="metric">
                        <span class="metric-label">Dean's List (3 semesters)</span>
                        <span class="metric-value positive">🏅 Achieved</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Hackathon Winner (FinTech)</span>
                        <span class="metric-value positive">🥇 1st Place</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Trading Competition</span>
                        <span class="metric-value positive">🥈 2nd Place</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Open Source Contributor</span>
                        <span class="metric-value positive">⭐ 500+ Stars</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">YouTube Channel</span>
                        <span class="metric-value neutral">📺 5K+ Subs</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="tab-content" id="contact">
            <div class="contact-form">
                <div class="form-header">
                    <h2 class="form-title">Let's Connect! 🚀</h2>
                    <p class="form-subtitle">Whether you want to discuss trading strategies, collaborate on projects, or just say hello, I'd love to hear from you!</p>
                </div>
                
                <form id="contactForm">
                    <div class="form-group">
                        <label for="name">Your Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter your full name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="your.email@example.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <input type="text" id="subject" name="subject" placeholder="What would you like to discuss?">
                    </div>
                    
                    <div class="form-group">
                        <label for="message">Your Message</label>
                        <textarea id="message" name="message" rows="6" placeholder="Share your thoughts, questions, or project ideas..." required></textarea>
                    </div>
                    
                    <button type="submit" class="submit-btn">
                        Send Message 📨
                    </button>
                </form>
                
                <div class="contact-info">
                    <h3>Get In Touch Directly</h3>
                    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 20px;">
                        <div class="contact-item">
                            📧 alex.thompson@student.university.edu
                        </div>
                        <div class="contact-item">
                            📱 +1 (555) 123-4567
                        </div>
                        <div class="contact-item">
                            💼 linkedin.com/in/alexthompson-dev
                        </div>
                        <div class="contact-item">
                            💻 github.com/alexthompson-trader
                        </div>
                        <div class="contact-item">
                            🐦 @AlexTradesCode
                        </div>
                        <div class="contact-item">
                            📺 YouTube: Alex Thompson - Trading & Tech
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 20px; background: rgba(59, 130, 246, 0.05); border-radius: 15px; border: 1px solid rgba(59, 130, 246, 0.1);">
                        <h4 style="color: #3b82f6; margin-bottom: 10px; font-weight: 600;">📍 Currently Based In</h4>
                        <p style="color: #64748b; margin: 0;">Boston, Massachusetts, USA<br>
                        Available for remote opportunities worldwide</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Tab navigation with smooth transitions
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                btn.classList.add('active');
                const targetTab = document.getElementById(btn.dataset.tab);
                setTimeout(() => {
                    targetTab.classList.add('active');
                    if (btn.dataset.tab === 'skills') {
                        animateProgressBars();
                    }
                }, 50);
            });
        });

        // Create floating geometric shapes
        function createFloatingShapes() {
            const shapesContainer = document.getElementById('shapes');
            const shapeCount = 12;
            
            for (let i = 0; i < shapeCount; i++) {
                const shape = document.createElement('div');
                shape.className = 'shape';
                const size = Math.random() * 150 + 50;
                shape.style.width = size + 'px';
                shape.style.height = size + 'px';
                shape.style.left = Math.random() * 100 + '%';
                shape.style.top = Math.random() * 100 + '%';
                shape.style.animationDelay = Math.random() * 8 + 's';
                shape.style.animationDuration = (Math.random() * 4 + 6) + 's';
                shapesContainer.appendChild(shape);
            }
        }

        // Animate progress bars with staggered effect
        function animateProgressBars() {
            const progressBars = document.querySelectorAll('.progress-fill');
            progressBars.forEach((bar, index) => {
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, index * 100);
            });
        }

        // Update market tickers with realistic price movements
        function updateTickers() {
            const tickers = document.querySelectorAll('.ticker-item');
            tickers.forEach(ticker => {
                const priceElement = ticker.querySelector('.ticker-price');
                const changeElement = ticker.querySelector('.ticker-change');
                
                // Add pulse effect
                ticker.style.transform = 'scale(1.02)';
                ticker.style.transition = 'transform 0.2s ease';
                
                setTimeout(() => {
                    ticker.style.transform = 'scale(1)';
                }, 300);
                
                // Simulate small price changes
                const currentPrice = parseFloat(priceElement.textContent.replace(/[$,]/g, ''));
                const change = (Math.random() - 0.5) * (currentPrice * 0.01);
                const newPrice = currentPrice + change;
                const changePercent = ((change / currentPrice) * 100).toFixed(1);
                
                if (Math.abs(change) > 0.01) {
                    const isPositive = change > 0;
                    priceElement.textContent = ' + newPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                    changeElement.textContent = (isPositive ? '+' : '') + changePercent + '% ' + (isPositive ? '↗' : '↘');
                    
                    priceElement.className = isPositive ? 'ticker-price positive' : 'ticker-price negative';
                    changeElement.className = isPositive ? 'ticker-change positive' : 'ticker-change negative';
                }
            });
        }

        // Enhanced form submission with multiple states
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            
            // Loading state
            btn.innerHTML = '📤 Sending...';
            btn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
            btn.disabled = true;
            
            setTimeout(() => {
                // Success state
                btn.innerHTML = '✅ Message Sent Successfully!';
                btn.style.background = 'linear-gradient(135deg, #059669, #047857)';
                
                setTimeout(() => {
                    // Reset to original state
                    btn.innerHTML = originalText;
                    btn.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
                    btn.disabled = false;
                    document.getElementById('contactForm').reset();
                }, 3000);
            }, 2000);
        });

        // Add hover effects to cards
        document.querySelectorAll('.card, .project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Initialize everything
        createFloatingShapes();
        animateProgressBars();
        
        // Update tickers every 5 seconds
        setInterval(updateTickers, 5000);
        
        // Add some initial ticker updates
        setTimeout(updateTickers, 1000);
        setTimeout(updateTickers, 3000);

        // Smooth scrolling for better UX
        document.documentElement.style.scrollBehavior = 'smooth';

        // Add intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards for scroll animations
        document.querySelectorAll('.card, .project-card').forEach(card => {
            card.style.opacity = '0.8';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    </script>
</body>
</html>