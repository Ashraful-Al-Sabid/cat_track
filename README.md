The live version of this project can be viewed at https://cattrackbeta.vercel.app/  

.
**_“Because pets can’t text, but they still have emotions — we give them a voice through sound and color.”_**
.
.
Data taken arbitrarily to evaluate current condition of cat. the main logic is given below : 
# -------- Input Validation --------
invalid_input = False

# Heartbeat validation
if (
    heartbeat is None
    or not isinstance(heartbeat, int)
    or heartbeat <= 0
    or heartbeat > 300
):
    invalid_input = True

# Sound frequency validation
elif (
    sound_freq is None
    or not isinstance(sound_freq, (int, float))
    or sound_freq < 0
    or sound_freq > 20000
):
    invalid_input = True

# Eating time validation
elif (
    eating_time is None
    or not isinstance(eating_time, (int, float))
    or eating_time < 0
    or eating_time > 168
):
    invalid_input = True


# -------- Emotion Detection --------
if invalid_input:
    emotion = "⚠️ Invalid Input"

elif heartbeat > 160 or sound_freq > 1500:
    emotion = "🚨 Alert Danger"        # Immediate action required

elif heartbeat > 140 or sound_freq > 1200:
    emotion = "🔴 Stressed / Danger"   # High alert

elif heartbeat < 60 and sound_freq < 300:
    emotion = "🔵 Sick / Low Energy"   # Cat is low energy / possibly unwell

elif eating_time >= 6:
    emotion = "🟡 Hungry"              # Cat has not eaten recently

else:
    emotion = "🟢 Happy / Calm"        # Normal sta
