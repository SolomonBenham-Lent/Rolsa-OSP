import "../style/tips.css";


const sections = [
    {
        title: "Energy Efficient Home",
        tips: [
            "Install LED bulbs throughout your home.",
            "Use a programmable thermostat to optimise heating and cooling.",
            "Insulate your hone properly to reduce energy waste.",
            "Seal windows and doors to prevent air leaks."
        ]
    },
    {
        title: "Transportation",
        tips: [
            "Walk,bike, or use public transportation when possible.",
            "Carpool with colleagues or friends.",
            "Consider switching to an electric or hybrid vehicle.",
            "Maintain your vehicle regularly for better fuel efficiency."
        ]
    },
    {
        title: "Dietary Choices",
        tips: [
            "Reduce meat consumption, especially red meat.",
            "Buy local and seasonal produce.",
            "Minimise food waste by planning meals.",
            "Compost organic waste."
        ]
    },
    {
        title: "Waste Reduction",
        tips: [
            "Recycle paper, plastic, glass, and metal.",
            "Use reusable bags, bottles, and containers.",
            "Avoid single-use plastics.",
            "Donate or repurpose items instead of discarding them."
        ]
    },
    {
        title: "Water Conservation",
        tips: [
            "Fix leaks promptly to prevent water waste.",
            "Install water-efficient fixtures and appliances.",
            "Collect rainwater for gardening purposes.",
            "Take shorter showers."
        ]
    },
    {
        title: "Renewable Energy",
        tips: [
            "Install solar panels on your property.",
            "Switch to a green energy provider",
            "Use solar-powered outdoor lighting",
            "Consider home battery storage systems"
        ]
    },
    {
        title: "Conscious Consumption",
        tips: [
            "Buy products with minimal packaging",
            "Support sustainable and ethical brands",
            "Choose quality over quantity to reduce waste",
            "Repair items instead of replacing them"
        ]
    },
    {
        title: "Daily Habits",
        tips: [
            "Turn off lights and unplug electronics when not in use.",
            "Use energy-efficient appliances.",
            "Air-dry clothes instead of using a dryer.",
            "Practice mindful consumption and waste reduction daily."
        ]
    }
];

function Tips() {
  return (
    <>
    <div className="tips_spacer">
        <h1>Carbon Footprint Reduction Tips</h1>
        <div className="tipsContainer">
            {sections.map((section) => (
                <article key={section.title} className="tip-card">
                    <h2 className="tip-title">{section.title}</h2>
                    <ul className="tip-list">
                        {section.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </article>
            ))}
        </div>
    </div>
    </>
  );
}
export default Tips;