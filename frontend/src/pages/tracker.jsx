import { useState } from 'react'
import "../style/tracker.css";

const Tracker = () => {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState('');
    const [errorField, setErrorField] = useState('');

    const units = {
        'Driving (miles)': 'miles',
        'Electricity (kWh)': 'kWh',
        'Flight (short-haul)': 'flights',
        'Meat-Based Meals': 'meals',
        'Natural Gas (therms)': 'therms',
        'Online Purchases': 'purchases',
    };
    const conversionRates = {
        'Driving (miles)': 0.4,
        'Electricity (kWh)': 0.2,
        'Flight (short-haul)': 110,
        'Meat-Based Meals': 8.1,
        'Natural Gas (therms)': 5.3,
        'Online Purchases': 15,
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category || !amount) {
            if (!category) {
                setError('Please select a category.');
                setErrorField('category');
            } else if (!amount) {
                setError('Please enter an amount greater than 0.');
                setErrorField('amount');
            }
            return;
        }
        const amt = parseFloat(amount);
        if (isNaN(amt) || amt <= 0) {
            setError('Amount must be a number greater than 0.');
            setErrorField('amount');
            return;
        }
    
    const iso = new Date().toISOString();
    const co2value = (conversionRates[category] || 0) * amt;
    const newLog = {
        id: Date.now(),
        category,
        amount: amt,
        description,
        unit: units[category] || 'units',
        timestamp: new Date().toLocaleString(),    
        timestampISO: iso,
        co2: Number(co2value.toFixed(2)),
    };
    setLogs([...logs, newLog]);
    setCategory('');
    setAmount('');
    setDescription('');
    setError('');
    setErrorField('');
    };

    const handleDelete = (id) => {
        setLogs((prev) => prev.filter((l) => l.id !== id));
    };

    // Derived summary values for UI (today, last 7 days, daily average)
    const getDateFromLog = (log) => {
        if (log.timestampISO) return new Date(log.timestampISO);
        const parsed = Date.parse(log.timestamp);
        return isNaN(parsed) ? new Date(log.timestamp) : new Date(parsed);
    };

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfNextDay = new Date(startOfToday);
    startOfNextDay.setDate(startOfNextDay.getDate() + 1);

    const startOf7DaysAgo = new Date(startOfToday);
    startOf7DaysAgo.setDate(startOf7DaysAgo.getDate() - 6);

    const todayTotal = logs.reduce((acc, l) => {
        const d = getDateFromLog(l);
        if (d >= startOfToday && d < startOfNextDay) return acc + (l.co2 || ((conversionRates[l.category] || 0) * l.amount || 0));
        return acc;
    }, 0);

    const sevenDayTotal = logs.reduce((acc, l) => {
        const d = getDateFromLog(l);
        if (d >= startOf7DaysAgo && d < startOfNextDay) return acc + (l.co2 || ((conversionRates[l.category] || 0) * l.amount || 0));
        return acc;
    }, 0);

    const dailyAverage = sevenDayTotal / 7;

    // Status vs targets
    const targetPerDay = 30; // Kg CO2 ideal target
    const avgPersonPerDay = 46; // Kg CO2 average person
    const status = dailyAverage <= targetPerDay ? 'Excellent' : (dailyAverage <= avgPersonPerDay ? 'Moderate' : 'High');
    const statusColorMap = {
        Excellent: '#beefc9',
        Moderate: '#f8e7b2',
        High: 'tomato',
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Carbon Tracker</h2>

            <div className="summaryGrid" style={{ marginTop: "8px" }}>
                <div className="summaryBox">
                    <div className="summaryTitle">Today's total</div>
                    <div className="summaryValue">{todayTotal.toFixed(2)} Kg CO2</div>
                </div>
                <div className="summaryBox">
                    <div className="summaryTitle">7-day total</div>
                    <div className="summaryValue">{sevenDayTotal.toFixed(2)} Kg CO2</div>
                </div>
                <div className="summaryBox">
                    <div className="summaryTitle">Daily average (7-day)</div>
                    <div className="summaryValue">{dailyAverage.toFixed(2)} Kg CO2</div>
                </div>
            </div>

            <div className="impactTable" style={{ marginTop: 6, display: 'inline-block' }}>
                <div className="calcImpact" style={{ padding: '8px 10px', background: statusColorMap[status], borderRadius: 4 }}>
                    <strong>Status:</strong> {status}
                </div>
                <div style={{ marginTop: 8, fontSize: 13 }}>
                    Target: {targetPerDay} Kg/day — Avg person: {avgPersonPerDay} Kg/day
                </div>
            </div>

                        <div className="trackercontainer">
                            <form className="trackerForm" onSubmit={handleSubmit}>
           {/*Dropdown for Category*/}
           <label>  
                category:
                <select
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); if (errorField === 'category') { setErrorField(''); setError(''); } }}
                    style={ errorField === 'category' ? { borderColor: '#dc3545', boxShadow: '0 0 0 3px rgba(220,53,69,0.08)' } : undefined }
                >
                    <option value="" disabled>Select Category</option>
                    <option value="Driving (miles)">Driving (miles)</option>
                    <option value="Electricity (kWh)">Electricity (kWh)</option>
                    <option value="Flight (short-haul)">Flight (short-haul)</option>
                    <option value="Meat-Based Meals">Meat-Based Meals</option>
                    <option value="Natural Gas (therms)">Natural Gas (therms)</option>
                    <option value="Online Purchases">Online Purchases</option>
                </select>
                {errorField === 'category' && error && (
                    <div style={{ background: '#fff5f5', border: '1px solid #f5c2c7', color: '#842029', padding: '8px 10px', borderRadius: 6, fontSize: 13, marginTop: 6 }}>{error}</div>
                )}
         </label>

         <br /><br />

        {/*Number Input for Amount*/}
        <label>
            Amount ({units[category] || 'units'}):
            <input
                type="number"
                value={amount}
                onChange={(e) => { setAmount(e.target.value.replace(/^-/, '')); if (errorField === 'amount') { setErrorField(''); setError(''); } }}
                min={0}
                step="any"
                style={ errorField === 'amount' ? { borderColor: '#dc3545', boxShadow: '0 0 0 3px rgba(220,53,69,0.08)' } : undefined }
                placeholder={units[category] ? `Enter amount in ${units[category]}` : 'Select a category first'}
            />
            {errorField === 'amount' && error && (
                <div style={{ background: '#fff5f5', border: '1px solid #f5c2c7', color: '#842029', padding: '8px 10px', borderRadius: 6, fontSize: 13, marginTop: 6 }}>{error}</div>
            )}
        </label>

        <br /><br />

        {/*Text Input for Description*/}
        <label>
            Description:
            <input
                type="text"
                value={description}
                onChange={(e) => { setDescription(e.target.value); if (errorField === 'description') { setErrorField(''); setError(''); } }}
                placeholder="Optional Description"
                style={ errorField === 'description' ? { borderColor: '#dc3545', boxShadow: '0 0 0 3px rgba(220,53,69,0.08)' } : undefined }
            />
            {errorField === 'description' && error && (
                <div style={{ background: '#fff5f5', border: '1px solid #f5c2c7', color: '#842029', padding: '8px 10px', borderRadius: 6, fontSize: 13, marginTop: 6 }}>{error}</div>
            )}
        </label>

        <br /><br />
        <button type="submit">Log Emission</button>
    </form>
    </div>

    

    <h3 style={{ marginTop: "12px" }}>All Entries</h3>
    {logs.length === 0 ? (
        <div style={{ color: '#666', marginBottom: 60 }}>No entries yet.</div>
    ) : (
        (() => {
            const recent = logs.slice().reverse();
            const maxCo2 = Math.max(...recent.map(l => (l.co2 || ((conversionRates[l.category] || 0) * (l.amount || 0)))), 1);
                return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                    {recent.map((log) => {
                        const co2val = (typeof log.co2 === 'number') ? log.co2 : ((conversionRates[log.category] || 0) * (log.amount || 0));
                        const pct = Math.min(100, (co2val / maxCo2) * 100);
                        return (
                            <div key={log.id} className="calcOutput" style={{ padding: 10, display: 'flex', alignItems: 'center', gap: 12, borderRadius: 8 }}>
                                <div style={{ width: 180, fontSize: 14 }}>
                                    <div style={{ fontWeight: 700 }}>{log.category}</div>
                                    <div style={{ fontSize: 12, color: '#666' }}>{log.amount} {log.unit}</div>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ background: '#ffffff', height: 18, borderRadius: 6, overflow: 'hidden', border: '1px solid #e6e6e6' }}>
                                        <div style={{ width: `${pct}%`, height: '100%', background: '#ffffff' }} />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, alignItems: 'center' }}>
                                        <div style={{ fontSize: 12, color: '#333' }}>{co2val.toFixed(2)} Kg CO2</div>
                                        <div style={{ fontSize: 12, color: '#666' }}>{log.timestamp}</div>
                                    </div>
                                    {log.description ? (
                                        <div style={{ marginTop: 6, fontSize: 13, color: '#444' }}>{log.description}</div>
                                    ) : null}
                                </div>
                                <div style={{ width: 80, textAlign: 'right' }}>
                                    <button type="button" onClick={() => handleDelete(log.id)} style={{ background: '#ff6b6b', color: '#fff', border: 'none', padding: '6px 8px', borderRadius: 4, cursor: 'pointer' }}>Delete</button>
                                </div>
                            </div>

                        );
                    })}
                </div>
            );
        })()
    )}
</div>
);
}

export default Tracker;