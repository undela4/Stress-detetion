import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def generate_dummy_ppg_dataset(length=1000, fs=10):
    # Simulate time
    time = np.linspace(0, length/fs, num=length)  # Time in seconds

    # Initialize arrays for PPG signal and heart rates
    ppg_signal = np.zeros(length)
    heart_rates = np.zeros(length)
    stress_labels = np.random.choice([0, 1], size=length, p=[0.7, 0.3])  # 70% non-stress, 30% stress

    # Generate synthetic PPG signal and heart rates based on stress labels
    for i in range(length):
        if stress_labels[i] == 0:  # Non-stress
            heart_rate = 72  # Normal heart rate
            noise_level = 0.05
        else:  # Stress
            heart_rate = np.random.randint(80, 100)  # Increased heart rate
            noise_level = 0.1  # More noise to simulate stress response

        # Simulate PPG signal as a sine wave + noise
        ppg_signal[i] = 0.5 * np.sin(2 * np.pi * (heart_rate / 60) * time[i]) + noise_level * np.random.normal()

        # Store heart rate
        heart_rates[i] = heart_rate

    # Create a DataFrame
    dataset = pd.DataFrame({
        'Time': time,
        'PPG_Signal': ppg_signal,
        'Heart_Rate': heart_rates,
        'Stress_Label': stress_labels
    })

    return dataset

# Generate a dummy dataset of length 1000
dummy_dataset = generate_dummy_ppg_dataset(length=1000)

# Plot the PPG signal with different colors for stressed and non-stressed data
plt.figure(figsize=(12, 6))

# Plot non-stressed data in blue
plt.plot(dummy_dataset[dummy_dataset['Stress_Label'] == 0]['Time'], 
         dummy_dataset[dummy_dataset['Stress_Label'] == 0]['PPG_Signal'], 
         label='Non-Stressed', color='blue')

# Plot stressed data in red
plt.plot(dummy_dataset[dummy_dataset['Stress_Label'] == 1]['Time'], 
         dummy_dataset[dummy_dataset['Stress_Label'] == 1]['PPG_Signal'], 
         label='Stressed', color='red')

plt.title('PPG Signal with Stress Labels')
plt.xlabel('Time (s)')
plt.ylabel('Amplitude')
plt.grid()
plt.legend()
plt.show()

# Save the dataset to a CSV file
dummy_dataset.to_csv('dummy_ppg_dataset.csv', index=False)
