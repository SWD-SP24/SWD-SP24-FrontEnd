import { useState } from "react";

const BluetoothUI = () => {
  const [device, setDevice] = useState(null);
  const [connected, setConnected] = useState(false);
  const [receivedData, setReceivedData] = useState("");

  // UUIDs for HM-10 or similar BLE UART devices
  const SERVICE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
  const CHARACTERISTIC_UUID = "0000ffe1-0000-1000-8000-00805f9b34fb";

  const connectToBluetooth = async () => {
    try {
      console.log("Requesting Bluetooth device...");
      const selectedDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true, // Show all BLE devices
        optionalServices: [SERVICE_UUID],
      });

      console.log("Connecting to GATT server...");
      const server = await selectedDevice.gatt.connect();
      setDevice(selectedDevice);
      setConnected(true);

      console.log("Getting service...");
      const service = await server.getPrimaryService(SERVICE_UUID);

      console.log("Getting characteristic...");
      const characteristic = await service.getCharacteristic(
        CHARACTERISTIC_UUID
      );

      console.log("Enabling notifications...");
      await characteristic.startNotifications();

      characteristic.addEventListener("characteristicvaluechanged", (event) => {
        const value = new TextDecoder().decode(event.target.value);
        setReceivedData((prevData) => prevData + value);
        console.log("Received:", value);
      });

      console.log("Connected to RS232 Bluetooth Adapter");
    } catch (error) {
      console.error("Bluetooth connection failed:", error);
    }
  };

  const disconnectDevice = () => {
    if (device && device.gatt.connected) {
      device.gatt.disconnect();
      setConnected(false);
      setDevice(null);
      setReceivedData("");
      console.log("Device disconnected.");
    }
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">RS232 Bluetooth Connection</h2>
      {!connected ? (
        <button
          onClick={connectToBluetooth}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Connect to RS232
        </button>
      ) : (
        <>
          <p className="font-semibold">
            Connected to: {device.name || "Unknown Device"}
          </p>
          <p className="mt-2 bg-gray-100 p-2 rounded">
            Data: {receivedData || "Waiting for data..."}
          </p>
          <button
            onClick={disconnectDevice}
            className="px-4 py-2 mt-3 bg-red-500 text-white rounded-lg"
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  );
};

export default BluetoothUI;
