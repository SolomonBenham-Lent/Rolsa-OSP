import { useState } from 'react'

const Tracker = () => {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [logs, setLogs] = useState([]);

    const units = {
        'Driving (miles)': 'miles',
        'Electricity (kWh)': 'kWh',
        'Flight (short-haul)': 'flights',
        'Meat-Based Meals': 'meals',
        'Natural Gas (therms)': 'therms',
        'Online Purchases': 'purchases',
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category || !amount || !description) {
            alert('Please fill in all fields.');
            return;
        }
    
    const newLog = {
        id: Date.now(),
        category,
        amount: parseFloat(amount),
        description,
        unit: units[category] || 'units',
        timestamp: new Date().toLocaleString(),
    }; 
    
    setLogs([...logs, newLog]);
    setCategory('');
    setAmount('');
    setDescription('');
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Carbon Tracker</h2>

            <form onSubmit={handleSubmit}>
           {/*Dropdown for Category*/}
           <label>  
                category:
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select a category</option>
                    <option value="Driving (miles)">Driving (miles)</option>
                    <option value="Electricity (kWh)">Electricity (kWh)</option>
                    <option value="Flight (short-haul)">Flight (short-haul)</option>
                    <option value="Meat-Based Meals">Meat-Based Meals</option>
                    <option value="Natural Gas (therms)">Natural Gas (therms)</option>
                    <option value="Online Purchases">Online Purchases</option>
                </select>
         </label>

         <br /><br />

        {/*Number Input for Amount*/}
        <label>
            Amount ({units[category] || 'units'}):
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={units[category] ? `Enter amount in ${units[category]}` : 'Select a category first'}
            />
        </label>

        <br /><br />

        {/*Text Input for Description*/}
        <label>
            Description:
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </label>

        <br /><br />
        <button type="submit">Log Emission</button>
    </form>

    <h3 style={{ marginTop: "30px" }}>Logged Emissions</h3>
    <ul style={{ listStyleType: "none", padding: 0 }}>
        {logs.map((log) => (
            <li
              key={log.id}
              style={{
                marginbottom: "15px",
                borderbottom: "1px solid #ccc",
                paddingbottom: "10px",
              }}
            >
                
            <div><strong>Category:</strong> {log.category}</div>
            <div><strong>Amount:</strong> {log.amount} {log.unit}</div>
            <div><strong>Description:</strong> {log.description}</div>
            <div style={{ fontSize: "0.8em", color: "#666" }}>
                <strong>Logged at:</strong> {log.timestamp}
            </div>
            </li>
        ))} 
    </ul>
</div>
);
}

export default Tracker;