import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, AlertTriangle, Map, Activity, 
  Wrench, TrendingUp, Send, PieChart as PieIcon
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

import robotAvatar from './robot-avatar.jpg';

const SeelAICopilot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // --- البيانات الديناميكية للرسوم البيانية ---
  
  // 1. بيانات تحليل التنبيهات (Bar Chart)
  const alertsData = [
    { name: 'Critical', count: 3, color: '#ff4d4d' },
    { name: 'Warning', count: 8, color: '#ffb703' },
    { name: 'Resolved', count: 24, color: '#00f2c3' },
  ];

  // 2. بيانات تحليل المنطقة - انخفاض الضغط (Line Chart)
  const zonePressureData = [
    { time: '08:00', psi: 40.2 },
    { time: '10:00', psi: 39.8 },
    { time: '12:00', psi: 35.1 }, // انخفاض مفاجئ (تسرب)
    { time: '14:00', psi: 34.5 },
    { time: '16:00', psi: 40.9 }, // تم الإصلاح
  ];

  // 3. ملخص الشبكة (Pie Chart)
  const networkHealthData = [
    { name: 'Healthy Nodes', value: 82, color: '#00f2c3' },
    { name: 'Under Repair', value: 12, color: '#ffb703' },
    { name: 'Critical', value: 6, color: '#ff4d4d' },
  ];

  // 4. بيانات الصيانة (Bar Chart بلون برتقالي)
  const maintenanceData = [
    { name: 'Pumps', tasks: 5 },
    { name: 'Valves', tasks: 12 },
    { name: 'Sensors', tasks: 3 },
    { name: 'Pipes', tasks: 8 },
  ];

  // --- حالة المحادثة الابتدائية ---
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', type: 'text', content: 'Welcome to AquaMind AI Copilot! How can I assist you with the water network today?' },
    { id: 2, sender: 'bot', type: 'cards' }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // إرسال نص عادي
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessages = [...messages, { id: Date.now(), sender: 'user', type: 'text', content: inputText }];
    setMessages(newMessages);
    setInputText('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', type: 'text', content: 'Processing your request... Here is the maintenance overview:' },
        { id: Date.now() + 2, sender: 'bot', type: 'chart', chartType: 'maintenance' }
      ]);
    }, 1000);
  };

  // --- شجرة القرارات الذكية للأزرار ---
  const handleCardClick = (title) => {
    const newMessages = [...messages, { id: Date.now(), sender: 'user', type: 'text', content: `Run: ${title}` }];
    setMessages(newMessages);
    
    setTimeout(() => {
      let botResponse = '';
      let chartType = '';

      if (title === 'Analyze Alerts') {
        botResponse = 'Compiling active alerts across Al Qassim WDN. Here is the severity breakdown:';
        chartType = 'alerts';
      } else if (title === 'Analyze Zone') {
        botResponse = 'Scanning Zone historical data... Detected a sudden pressure drop at 12:00 PM:';
        chartType = 'zone';
      } else if (title === 'Network Summary') {
        botResponse = 'Overall Network Health is currently at 82.4%. Here is the node status distribution:';
        chartType = 'network';
      } else {
        botResponse = 'Retrieving pending maintenance tasks categorized by equipment type:';
        chartType = 'maintenance';
      }

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', type: 'text', content: botResponse },
        { id: Date.now() + 2, sender: 'bot', type: 'chart', chartType: chartType }
      ]);
    }, 800);
  };

  const chatVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } }
  };

  // --- دالة مساعدة لتقديم الرسم البياني المناسب ---
  const renderDynamicChart = (chartType) => {
    switch(chartType) {
      case 'alerts':
        return (
          <div style={{ width: '100%', height: '180px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#ff9800', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={14} /> Alerts Severity Breakdown
            </h4>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={alertsData} margin={{ top: 0, right: 10, left: -25, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 152, 0, 0.1)" horizontal={false} />
                <XAxis type="number" stroke="#aaa" fontSize={10} hide />
                <YAxis dataKey="name" type="category" stroke="#ccc" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} contentStyle={{ background: '#020813', border: '1px solid #ff9800', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {alertsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'zone':
        return (
          <div style={{ width: '100%', height: '180px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#ff9800', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={14} /> Pressure Variance (PSI)
            </h4>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={zonePressureData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 152, 0, 0.1)" vertical={false} />
                <XAxis dataKey="time" stroke="#aaa" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#aaa" fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip contentStyle={{ background: '#020813', border: '1px solid #ff9800', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                <Line type="monotone" dataKey="psi" stroke="#ff9800" strokeWidth={3} dot={{ r: 4, fill: '#020813', stroke: '#ff9800' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      case 'network':
        return (
          <div style={{ width: '100%', height: '180px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#ff9800', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PieIcon size={14} /> Node Status Distribution
            </h4>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Pie data={networkHealthData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                  {networkHealthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#020813', border: '1px solid #ff9800', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );

      default: // Maintenance
        return (
          <div style={{ width: '100%', height: '180px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#ff9800', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wrench size={14} /> Pending Tasks by Equipment
            </h4>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={maintenanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 152, 0, 0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="#aaa" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#aaa" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'rgba(255, 152, 0, 0.1)' }} contentStyle={{ background: '#020813', border: '1px solid #ff9800', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                <Bar dataKey="tasks" fill="#ff9800" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
    }
  };

  return (
    <>
      {/* الزر العائم */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{ position: 'fixed', bottom: '30px', left: '100px', zIndex: 9999, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
          >
            <div className="pulse" style={{ background: '#ff9800', color: '#fff', padding: '5px 15px', borderRadius: '15px 15px 15px 0', marginBottom: '10px', fontWeight: 'bold', fontSize: '12px', boxShadow: '0 0 15px rgba(255,152,0,0.5)' }}>
              HI!
            </div>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#020813', border: '2px solid #ff9800', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(0,0,0,0.8)', overflow: 'hidden' }}>
              <img src={robotAvatar} alt="AI Bot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* نافذة المحادثة العائمة */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={chatVariants}
            initial="hidden" animate="visible" exit="exit"
            className="panel-glass"
            style={{ 
              position: 'fixed', bottom: '30px', left: '100px', height: '550px', width: '380px', 
              background: 'rgba(4, 20, 40, 0.95)', border: '1px solid rgba(255, 152, 0, 0.3)', 
              zIndex: 9999, display: 'flex', flexDirection: 'column', borderRadius: '20px', 
              boxShadow: '0 15px 40px rgba(0,0,0,0.8)', overflow: 'hidden'
            }}
          >
            {/* الهيدر */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', borderBottom: '1px solid rgba(255, 152, 0, 0.1)', background: 'linear-gradient(90deg, rgba(255, 152, 0, 0.1), transparent)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 152, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ff9800', overflow: 'hidden' }}>
                  <img src={robotAvatar} alt="Bot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h2 style={{ margin: 0, color: '#fff', fontSize: '15px', letterSpacing: '1px' }}>SEEL AI Copilot</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00f2c3', display: 'inline-block' }}></span>
                    <p style={{ margin: 0, color: '#ff9800', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Online</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: '#ff9800', cursor: 'pointer' }}>
                <X size={22} />
              </button>
            </div>

            {/* منطقة المحادثة */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  
                  {/* رسالة نصية - تم تعديل لون رسالة المستخدم للبرتقالي */}
                  {msg.type === 'text' && (
                    <div style={{ 
                      maxWidth: '85%', padding: '10px 15px', 
                      borderRadius: msg.sender === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0', 
                      background: msg.sender === 'user' ? 'linear-gradient(90deg, #ff9800, #ff5722)' : 'rgba(255, 255, 255, 0.05)', 
                      color: msg.sender === 'user' ? '#fff' : '#e0f2fe', 
                      border: msg.sender === 'bot' ? '1px solid rgba(255, 152, 0, 0.2)' : 'none', 
                      fontSize: '13px', lineHeight: '1.5', fontWeight: msg.sender === 'user' ? 'bold' : 'normal' 
                    }}>
                      {msg.content}
                    </div>
                  )}

                  {/* أزرار الإجراءات السريعة */}
                  {msg.type === 'cards' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '5px', width: '100%' }}>
                      <ActionCard title="Analyze Alerts" icon={<AlertTriangle size={16} color="#ff9800" />} onClick={() => handleCardClick('Analyze Alerts')} />
                      <ActionCard title="Analyze Zone" icon={<Map size={16} color="#ff9800" />} onClick={() => handleCardClick('Analyze Zone')} />
                      <ActionCard title="Network Summary" icon={<Activity size={16} color="#ff9800" />} onClick={() => handleCardClick('Network Summary')} />
                      <ActionCard title="Maintenance" icon={<Wrench size={16} color="#ff9800" />} onClick={() => handleCardClick('Maintenance')} />
                    </div>
                  )}

                  {/* المخطط البياني الديناميكي */}
                  {msg.type === 'chart' && (
                    <div style={{ width: '100%', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 152, 0, 0.3)', borderRadius: '15px 15px 15px 0', padding: '15px', marginTop: '5px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {renderDynamicChart(msg.chartType)}
                    </div>
                  )}

                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* شريط الإدخال */}
            <div style={{ padding: '15px', borderTop: '1px solid rgba(255, 152, 0, 0.1)', background: 'rgba(2, 8, 19, 0.95)' }}>
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask AI for analytics or reports..." 
                  style={{ flex: 1, background: 'rgba(255, 152, 0, 0.05)', border: '1px solid rgba(255, 152, 0, 0.3)', borderRadius: '25px', padding: '10px 15px', color: '#fff', fontSize: '12px', outline: 'none' }}
                />
                <button 
                  type="submit"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(90deg, #ff9800, #ff5722)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', flexShrink: 0 }}
                >
                  <Send size={16} style={{ marginLeft: '-2px' }} />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ActionCard = ({ title, icon, onClick }) => (
  <motion.button 
    whileHover={{ translateY: -2, backgroundColor: 'rgba(255, 152, 0, 0.15)', borderColor: '#ff9800' }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    style={{ background: 'rgba(255, 152, 0, 0.05)', border: '1px solid rgba(255, 152, 0, 0.2)', padding: '10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left', transition: '0.3s', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
  >
    {icon}
    {title}
  </motion.button>
);

export default SeelAICopilot;