import {
  Bluetooth,
  BluetoothConnected,
  BluetoothSearching,
} from "lucide-react";
import React, { useState } from "react";
import { extractWeight } from "../../../util/formatData";
export default function BluetoothWeight({ setWeightCurrent }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [retrievedValue, setRetrievedValue] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [bleServer, setBleServer] = useState(null);
  const [sensorCharacteristic, setSensorCharacteristic] = useState(null);

  const deviceName = "ESP32";
  const bleService = "19b10000-e8f2-537e-4f6c-d104768a1214";
  const sensorCharacteristicUUID = "19b10001-e8f2-537e-4f6c-d104768a1214";

  const isWebBluetoothEnabled = () => {
    if (!navigator.bluetooth) {
      setIsConnected(false);
      return false;
    }
    return true;
  };

  const connectToDevice = async () => {
    console.log("Clicked!");
    if (!isWebBluetoothEnabled()) return;

    setIsSearching(true); // Show searching state

    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: deviceName }],
        optionalServices: [bleService],
      });

      setIsSearching(false);
      setIsConnected(true);

      device.addEventListener("gattservicedisconnected", onDisconnected);
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(bleService);
      const characteristic = await service.getCharacteristic(
        sensorCharacteristicUUID
      );

      setBleServer(server);
      setSensorCharacteristic(characteristic);

      characteristic.addEventListener(
        "characteristicvaluechanged",
        handleCharacteristicChange
      );
      await characteristic.startNotifications();

      const value = await characteristic.readValue();
      setRetrievedValue(new TextDecoder().decode(value));
    } catch (error) {
      console.error("Connection error: ", error);
      setIsSearching(false);
      setIsConnected(false);
    }
  };

  const onDisconnected = () => {
    setIsConnected(false);
    connectToDevice();
  };

  const handleCharacteristicChange = (event) => {
    setRetrievedValue(new TextDecoder().decode(event.target.value));
    setTimestamp(new Date().toLocaleString());
  };

  const disconnectDevice = async () => {
    console.log("Clicked!");
    if (!isConnected || !bleServer) {
      alert("Bluetooth is not connected.");
      return;
    }
    try {
      if (sensorCharacteristic) {
        await sensorCharacteristic.stopNotifications();
      }
      await bleServer.disconnect();
      setIsConnected(false);
    } catch (error) {
      console.error("Disconnect error: ", error);
    }
  };

  /** 🔵 Dynamically select Bluetooth icon */
  const renderBluetoothIcon = () => {
    if (isSearching) {
      return (
        <button className="input-group-text" style={{ cursor: "pointer" }}>
          <BluetoothSearching size={21} color="#f5a623" />
        </button>
      );
    }
    if (isConnected) {
      return (
        <button
          className="input-group-text"
          onClick={disconnectDevice}
          style={{ cursor: "pointer" }}
        >
          <BluetoothConnected size={21} color="#778BE3" />
        </button>
      );
    }
    return (
      <button
        className="input-group-text"
        onClick={connectToDevice}
        style={{ cursor: "pointer" }}
      >
        <Bluetooth size={21} color="#778BE3" />
      </button>
    );
  };

  return (
    <div className="input-group">
      <input
        value={extractWeight(retrievedValue)}
        type="text"
        id="weight"
        className="form-control"
        placeholder="Enter Weight"
        onChange={(e) => setWeightCurrent(e.target.value)}
      />
      {renderBluetoothIcon()}
    </div>
  );
}
