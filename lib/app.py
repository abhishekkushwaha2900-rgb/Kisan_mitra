from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    user_message = data.get("message", "").lower().strip()

    if "गेहूं" in user_message or "wheat" in user_message:
        reply = "गेहूं की फसल के लिए उचित सिंचाई, संतुलित पोषक तत्व और स्थानीय मौसम के अनुसार खेती करना जरूरी है।"

    elif "धान" in user_message or "rice" in user_message:
        reply = "धान के लिए पर्याप्त पानी और उपयुक्त तापमान जरूरी है। स्थानीय मौसम और मिट्टी के अनुसार सिंचाई करें।"

    elif "मिट्टी" in user_message or "soil" in user_message:
        reply = "मिट्टी की जांच से pH, EC और NPK की जानकारी मिलती है। इससे सही फसल और खाद का चयन करने में मदद मिलती है।"

    elif "नमस्ते" in user_message or "hello" in user_message or "hi" in user_message:
        reply = "नमस्ते! 🙏 मैं आपका Smart Crop AI Assistant हूँ। आप खेती, फसल, मिट्टी और सिंचाई से जुड़े सवाल पूछ सकते हैं।"

    else:
        reply = "आप मुझसे फसल, मिट्टी, सिंचाई, मौसम और खेती से संबंधित सवाल पूछ सकते हैं। 🌾"

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
