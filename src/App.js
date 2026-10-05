import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { MapContainer, TileLayer, Circle, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faTachometerAlt, faBrain, faExclamationTriangle, faCheckDouble, faBroadcastTower, faRobot, faWallet, faLeaf, faCrosshairs, faHeartbeat, faWaveSquare, faSatelliteDish, faFileSignature, faLightbulb, faSkullCrossbones, faHome, faChartPie, faMapMarkedAlt, faCog, faDatabase, faShareFromSquare, faServer, faTerminal, faCheckCircle, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import SeelAICopilot from './SeelAICopilot';

// --- تصميم نقاط الاستشعار (Glowing Nodes) بدون الاعتماد على روابط خارجية ---
const createNodeIcon = (color) => {
    return new L.divIcon({
        className: 'custom-node',
        html: `
            <div style="
                width: 18px; 
                height: 18px; 
                background-color: ${color}; 
                border-radius: 50%; 
                border: 2px solid #020813;
                box-shadow: 0 0 15px ${color}, inset 0 0 5px rgba(255,255,255,0.8);
            "></div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
        popupAnchor: [0, -12]
    });
};

const dangerIcon = createNodeIcon('#ff4d4d');   // أحمر
const warningIcon = createNodeIcon('#ffb703');  // أصفر
const droneIcon = createNodeIcon('#00d4ff');    // أزرق
const successIcon = createNodeIcon('#00f2c3');  // أخضر

function App() {
    const mapCenter = [26.0500, 43.7000]; 
    const [activePage, setActivePage] = useState('home');

    // 3 Diverse Engineering Alerts
    const [alerts, setAlerts] = useState([
        { 
            id: 'QAS-BUR-01', zone: 'Buraydah Main Aqueduct', lat: 26.3260, lng: 43.9750, status: 'critical', type: 'Critical Rupture Prediction', ttf: '02h : 15m',
            faultDetails: 'Severe pressure surge detected, followed by acoustic resonance anomalies indicating an imminent fracture in the 600mm pipe.',
            proposedSolution: 'Isolate Main Valve A4 immediately. Reroute flow through secondary backup lines and dispatch emergency repair crew.',
            impact: 'CATASTROPHIC: Complete water outage in Al Iskan & Al Rayyan districts within 2 hours. 65% probability of severe sinkhole formation.'
        },
        { 
            id: 'QAS-UNZ-04', zone: 'Unaizah Distribution Sector', lat: 26.0941, lng: 43.9765, status: 'inspecting', type: 'Micro-Leak & Soil Saturation', ttf: '14h : 40m',
            faultDetails: 'Gradual, sustained pressure drop matching the acoustic signature of a micro-leak. Soil moisture sensors indicate localized saturation.',
            proposedSolution: 'Dispatch AI thermal-imaging drone to pinpoint exact leak coordinates. Apply hydraulic sealant upon confirmation.',
            impact: 'WARNING: Unaddressed leak will cause a 35% pressure loss in neighborhoods adjacent to King Saud Hospital within 48 hours.'
        },
        { 
            id: 'QAS-RAS-09', zone: 'Ar Rass Pumping Station', lat: 25.8694, lng: 43.4973, status: 'inspecting', type: 'Pump Cavitation Risk', ttf: '72h : 00m',
            faultDetails: 'High-frequency vibration detected in Pump #3. Inconsistent flow rates suggest vapor bubble implosions (Cavitation) damaging the impeller.',
            proposedSolution: 'Throttle discharge valve to increase net positive suction head (NPSH). Schedule automated shutdown if vibration exceeds 15mm/s.',
            impact: 'MODERATE: Irreversible mechanical damage to the $250,000 pump unit if not mitigated within 72 hours.'
        }
    ]);

    const [savedWater, setSavedWater] = useState(14500);
    const [savedMoney, setSavedMoney] = useState(3240);

    const [telemetryLogs, setTelemetryLogs] = useState([
        "[SYS] Buraydah Node A1: Pressure nominal (40.2 PSI)",
        "[SYS] Unaizah Node B4: Syncing acoustic data..."
    ]);

    useEffect(() => {
        const liveFeeds = [
            "[AI] Scanning Qassim region for micro-vibrations...",
            "[SENSOR] Unaizah Node D2: Acoustic resonance normal (12.4 Hz)",
            "[WARN] Buraydah Node A1: Minor pressure fluctuation detected.",
            "[SYS] Re-calibrating LSTM prediction matrices...",
            "[SENSOR] Ar Rass Pump #3: Vibration monitoring active.",
            "[AI] Cross-referencing historical rupture data in Qassim..."
        ];
        let i = 0;
        const interval = setInterval(() => {
            setTelemetryLogs(prev => [...prev.slice(-4), liveFeeds[i % liveFeeds.length]]);
            i++;
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const chartData = Array.from({ length: 30 }, (_, i) => ({
        cycle: i,
        flowRate: alerts.some(a => a.status === 'critical') ? Math.abs(Math.sin(i / 2) * 8 + 15) : 20 + Math.random() * 2
    }));

    const dispatchDrone = (id) => setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'inspecting' } : a));
    
    const resolveAlert = (id) => {
        setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
        setSavedWater(prev => prev + 2500); 
        setSavedMoney(prev => prev + 450);
    };

    const shareReport = (alert) => {
        const googleMapsLink = `https://www.google.com/maps?q=${alert.lat},${alert.lng}`;
        let reportText = "";

        if (alert.status === 'resolved') {
            reportText = `✅ *WDN AI RESOLUTION REPORT* ✅\n\n📍 *Node:* ${alert.zone}\n🗺️ *Location Map:* ${googleMapsLink}\n🛠️ *Resolved Issue:* ${alert.type}\n💧 *Network Status:* Stable. Optimal pressure restored. Disaster averted.\n🤖 *AI Core:* System returned to secure baseline operations.`;
            navigator.clipboard.writeText(reportText).then(() => window.alert("✅ Resolution report copied to clipboard!"));
        } else {
            reportText = `🚨 *WDN AI EMERGENCY REPORT* 🚨\n\n📍 *Node:* ${alert.zone}\n🗺️ *Location Map:* ${googleMapsLink}\n⚠️ *Anomaly Detected:* ${alert.type}\n⏳ *Time-To-Failure (TTF):* ${alert.ttf}\n\n📝 *Diagnostics:*\n${alert.faultDetails}\n\n💡 *AI Recommendation:*\n${alert.proposedSolution}\n\n💥 *Impact if Ignored:*\n${alert.impact}`;
            navigator.clipboard.writeText(reportText).then(() => window.alert("✅ Emergency report copied to clipboard!"));
        }
    };

    return (
        <div className="immersive-dashboard flex-layout">
            <div className="radar-sweep-overlay"></div>

            <nav className="side-navigation">
                <div className="nav-logo"><FontAwesomeIcon icon={faWaveSquare} className="pulse text-cyan" /></div>
                <div className="nav-items">
                    <button className={`nav-btn ${activePage === 'home' ? 'active' : ''}`} onClick={() => setActivePage('home')}><FontAwesomeIcon icon={faHome} /><span>Home</span></button>
                    <button className={`nav-btn ${activePage === 'map' ? 'active' : ''}`} onClick={() => setActivePage('map')}><FontAwesomeIcon icon={faMapMarkedAlt} /><span>Map</span></button>
                    <button className={`nav-btn ${activePage === 'analytics' ? 'active' : ''}`} onClick={() => setActivePage('analytics')}><FontAwesomeIcon icon={faChartPie} /><span>Analytics</span></button>
                    <button className={`nav-btn ${activePage === 'lstm' ? 'active' : ''}`} onClick={() => setActivePage('lstm')}><FontAwesomeIcon icon={faDatabase} /><span>AI Model</span></button>
                </div>
                <div className="nav-bottom"><button className="nav-btn"><FontAwesomeIcon icon={faCog} /><span>Settings</span></button></div>
            </nav>

            <main className="main-viewport">
                <div className="map-fullscreen-layer">
                    <MapContainer center={mapCenter} zoom={10} zoomControl={false} style={{ height: '100%', width: '100%' }}>
                        {/* خريطة الوضع الداكن (Dark Mode) المجانية */}
                        <TileLayer
                            url="https://tiles.stadiamaps.com/tiles/stamen_toner_dark/{z}/{x}/{y}{r}.png"
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                            />
                        {activePage !== 'analytics' && activePage !== 'lstm' && alerts.map(alert => (
                            <React.Fragment key={alert.id}>
                                <Circle center={[alert.lat, alert.lng]} radius={alert.status === 'resolved' ? 500 : (alert.status === 'inspecting' ? 800 : 2500)} pathOptions={{ color: alert.status === 'resolved' ? '#00f2c3' : (alert.status === 'critical' ? '#ff4d4d' : '#00d4ff'), fillOpacity: 0.2, className: alert.status !== 'resolved' ? 'pulse-circle' : '' }} />
                                <Marker position={[alert.lat, alert.lng]} icon={alert.status === 'resolved' ? successIcon : (alert.status === 'critical' ? dangerIcon : warningIcon)}>
                                    <Popup className="hologram-popup custom-wide-popup">
                                        <div className="holo-content">
                                            <h4 className={alert.status === 'resolved' ? 'text-teal' : (alert.status === 'critical' ? 'text-coral' : 'text-cyan')}><FontAwesomeIcon icon={alert.status === 'resolved' ? faCheckCircle : faCrosshairs} /> {alert.status === 'resolved' ? 'ISSUE RESOLVED' : alert.type}</h4>
                                            <p><span>CITY NODE:</span> {alert.zone}</p>
                                            <div className="popup-divider"></div>
                                            <p className="detailed-desc"><strong>{alert.status === 'resolved' ? 'Status:' : 'Diagnostic:'}</strong> {alert.status === 'resolved' ? 'Issue mitigated. Flow and pressure rates have returned to optimal baseline levels.' : alert.faultDetails}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            </React.Fragment>
                        ))}
                    </MapContainer>
                </div>

                <div className="floating-ui-layer">
                    <header className="floating-header panel-glass">
                        <div className="logo-section">
                            <div className="radar-icon"><FontAwesomeIcon icon={faBroadcastTower} className="spin-slow" /></div>
                            <div><h1>AquaMind AI</h1><p>Regional Autonomous Water Network Intelligence</p></div>
                        </div>
                        <div className="health-score">
                            <FontAwesomeIcon icon={faHeartbeat} className="pulse text-teal" />
                            <div><span>REGIONAL HEALTH</span><strong>{alerts.every(a => a.status === 'resolved') ? '100%' : '82.4%'}</strong></div>
                        </div>
                    </header>

                    {activePage === 'home' && (
                        <div className="page-content split-view">
                            <div className="floating-sidebar left-sidebar">
                                <div className="stats-grid">
                                    <div className="stat-box panel-glass"><FontAwesomeIcon icon={faTachometerAlt} className="stat-icon text-cyan" /><h3>40.9</h3><p>PSI</p></div>
                                    <div className="stat-box panel-glass"><FontAwesomeIcon icon={faTint} className="stat-icon text-blue" /><h3>76.4</h3><p>m³/h</p></div>
                                    <div className="stat-box panel-glass"><FontAwesomeIcon icon={faWaveSquare} className="stat-icon text-purple" /><h3>14.2</h3><p>Hz</p></div>
                                </div>
                                <div className="telemetry-panel panel-glass">
                                    <h3><FontAwesomeIcon icon={faSatelliteDish} className="pulse text-cyan" /> LIVE TELEMETRY</h3>
                                    <div className="telemetry-screen">{telemetryLogs.map((log, i) => <div key={i} className="telemetry-line">{log}</div>)}</div>
                                </div>
                            </div>

                            <div className="floating-sidebar right-sidebar wide-sidebar">
                                <div className="action-panel panel-glass scrollable-action-panel">
                                    <h3><FontAwesomeIcon icon={faExclamationTriangle} /> AI DIAGNOSTIC REPORTS</h3>
                                    <div className="alerts-container detailed-alerts">
                                        {alerts.map(alert => (
                                            <div key={alert.id} className={`hydro-alert detailed-card ${alert.status}`}>
                                                <div className="alert-header">
                                                    <div className="header-flex">
                                                        <FontAwesomeIcon icon={alert.status === 'resolved' ? faCheckCircle : (alert.status === 'critical' ? faExclamationTriangle : faRobot)} className={`alert-ico ${alert.status !== 'resolved' ? 'pulse' : ''}`} />
                                                        <div><h4>{alert.status === 'resolved' ? 'SYSTEM SECURE' : alert.type}</h4><p className="text-cyan font-bold">{alert.zone}</p></div>
                                                    </div>
                                                    <div className="header-actions">
                                                        {alert.status === 'critical' && <div className="ttf-badge">TTF: <strong>{alert.ttf}</strong></div>}
                                                        <button className="btn-share" onClick={() => shareReport(alert)} title="Share Report">
                                                            <FontAwesomeIcon icon={faShareFromSquare} />
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                {alert.status !== 'resolved' ? (
                                                    <div className="ai-diagnostic-report eng-text">
                                                        <div className="report-row"><FontAwesomeIcon icon={faFileSignature} className="text-cyan" /><p><strong>Diagnostic:</strong> {alert.faultDetails}</p></div>
                                                        <div className="report-row"><FontAwesomeIcon icon={faLightbulb} className="text-gold" /><p><strong>AI Recommendation:</strong> {alert.proposedSolution}</p></div>
                                                        <div className="report-row impact-row"><FontAwesomeIcon icon={faSkullCrossbones} className="text-coral pulse" /><p><strong>Critical Impact (24h):</strong> {alert.impact}</p></div>
                                                    </div>
                                                ) : (
                                                    <div className="ai-diagnostic-report eng-text" style={{ background: 'rgba(0, 242, 195, 0.1)', border: '1px solid rgba(0, 242, 195, 0.3)' }}>
                                                        <div className="report-row"><FontAwesomeIcon icon={faCheckDouble} className="text-teal" /><p><strong>Report Status:</strong> Resolution verified by AI core. Network operating at peak efficiency.</p></div>
                                                    </div>
                                                )}

                                                <div className="alert-action">
                                                    {alert.status === 'critical' ? (
                                                        <button className="btn-hydro btn-cyan pulse" onClick={() => dispatchDrone(alert.id)}>DISPATCH AI DRONE</button>
                                                    ) : alert.status === 'inspecting' ? (
                                                        <button className="btn-hydro btn-gold" onClick={() => resolveAlert(alert.id)}>MARK AS RESOLVED</button>
                                                    ) : (
                                                        <button className="btn-hydro btn-teal" disabled>ISSUE RESOLVED</button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activePage === 'map' && (
                        <div className="page-content map-view">
                            <div className="map-legend panel-glass">
                                <h4>Map Legend</h4>
                                <ul>
                                    <li><span className="dot dot-red"></span> Critical Rupture</li>
                                    <li><span className="dot dot-blue"></span> Drone Inspecting</li>
                                    <li><span className="dot dot-teal"></span> Issue Resolved</li>
                                </ul>
                            </div>
                        </div>
                    )}
                    
                    {activePage === 'analytics' && (
                        <div className="page-content center-view">
                            <div className="analytics-card panel-glass">
                                <h3><FontAwesomeIcon icon={faBrain} /> PREDICTIVE FLOW DYNAMICS (30 DAYS)</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="hydroGradientBig" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#0055ff" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="cycle" stroke="#7dd3fc" />
                                        <YAxis stroke="#7dd3fc" />
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.1)" />
                                        <Tooltip contentStyle={{ background: 'rgba(2, 10, 20, 0.9)', border: '1px solid #00d4ff', borderRadius: '8px', color: '#fff' }}/>
                                        <Area type="monotone" dataKey="flowRate" stroke="#00d4ff" fillOpacity={1} fill="url(#hydroGradientBig)" strokeWidth={4}/>
                                    </AreaChart>
                                </ResponsiveContainer>
                                <div className="analytics-summary">
                                    <div className="sum-box"><h4>{savedWater} L</h4><p>Total Water Saved</p></div>
                                    <div className="sum-box"><h4>${savedMoney}</h4><p>Maintenance Budget Saved</p></div>
                                    <div className="sum-box"><h4>98.5%</h4><p>Overall Accuracy</p></div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activePage === 'lstm' && (
                        <div className="page-content center-view">
                            <div className="lstm-card panel-glass">
                                <div className="lstm-header">
                                    <h3><FontAwesomeIcon icon={faServer} /> <span>AI Model Architecture</span></h3>
                                    <span className="status-badge pulse">MODEL ONLINE</span>
                                </div>
                                <div className="lstm-grid">
                                    <div className="lstm-specs">
                                        <ul>
                                            <li><strong>Framework:</strong> TensorFlow / Keras</li>
                                            <li><strong>Layers:</strong> 3 Deep Neural Layers + Dense Output</li>
                                            <li><strong>Sequence Length:</strong> 24 Timesteps</li>
                                            <li><strong>Optimization:</strong> Adam (lr=0.001)</li>
                                            <li><strong>Imbalance Handling:</strong> SMOTE Technique applied</li>
                                        </ul>
                                    </div>
                                    <div className="terminal-panel panel-glass">
                                        <h3><FontAwesomeIcon icon={faTerminal} /> KERNEL LOGS</h3>
                                        <div className="telemetry-screen">
                                            <div className="telemetry-line text-cyan">{'>'} Epoch 50/50 [==============================]</div>
                                            <div className="telemetry-line text-teal">{'>'} loss: 0.0142 - val_loss: 0.0155</div>
                                            <div className="telemetry-line text-purple">{'>'} Model weights saved successfully.</div>
                                            <div className="telemetry-line">{'>'} Initiating live inference pipeline...</div>
                                            <div className="telemetry-line text-coral">{'>'} Anomaly threshold set to 85% confidence.</div>
                                            <div className="telemetry-line blink-cursor">_</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* --- عرض المساعد الذكي هنا --- */}
            <SeelAICopilot />
            
        </div>
    );
}

export default App;