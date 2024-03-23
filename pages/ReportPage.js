import * as React from "react";
import { View, StyleSheet, Button, Platform, Text, Image } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Medical Report</title>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
    }
    .container {
        width: 80%;
        margin: 20px auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h1, h2, h3 {
        color: #333;
    }
    p {
        color: #666;
        display: inline
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }
    th, td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    th {
        background-color: #f2f2f2;
    }
    .logo {
       text-align: center;
       font-style: italic;
    }
    .text{
        text-align: center;
        font-weight: normal;
        font-size: 24px;
    }
    .note-text{
        margin: 10px;
        margin-top: 30px;
        font-size: 12px
    }
</style>
</head>
<body>
<div class="container">
<h1 class='logo'>AlzAware</h1>
<h1 class='text'>(Mobile Early Alzheimer's Dectection)</h1>
    <h1>Medical Report</h1>
    <p><strong>Name:</strong> John Ddoe</p> &nbsp;&nbsp;
    <p><strong>ID:</strong>  12345678</p> &nbsp;&nbsp;
    <p><strong>Contact:</strong> +923123456789</p>&nbsp;&nbsp;<br/>
    <p><strong>Email:</strong> John@gamil.com</p> &nbsp;&nbsp;
    <p><strong>Print Date:</strong> 12-12-2024</p>&nbsp;&nbsp;
    <p><strong>Record-no:</strong> user_id</p>&nbsp;&nbsp;
    <h2>Diagnosis or Findings</h2>
    <p> Detected Stage: AD-Alzheimer Disease</p>
    
    <h2>Overall Probabilities</h2>
    <table>
        <tr>
            <th>Class or Type</th>
            <th>Probability</th>
        </tr>
        <tr>
            <td>AD - Alzheimer Disease</td>
            <td>99%</td>
        </tr>
        <tr>
            <td>CN - Cognitively Normal</td>
            <td>0.0003292831024737097%</td>
        </tr>
        <tr>
            <td>EMCI - Early Mild Cognitive Impairment</td>
            <td>0.0000014620346746596624%</td>
        </tr>
        <tr>
            <td>LMCI - Late Mild Cognitive Impairment</td>
            <td>0.000004989385615772335%</td>
        </tr>
        <tr>
            <td>MCI - Mild Cognitive Impairment</td>
            <td>0.00000000030083230351252155%</td>
        </tr>
    </table>
    <h2>Medications</h2>
    <ul>
        <li>Antiviral medication: Oseltamivir</li>
        <li>Analgesic: Acetaminophen</li>
    </ul>
    <h2>Recommendations</h2>
    <p>Bed rest and plenty of fluids are recommended. Follow up with primary care physician in 3 days if symptoms persist.</p>
   <div class='note-text'> Note: This is a computer generated report, does not require signature
    TEST PERFORMED ON AUTOMATED Machine trained Model.
    </div>
    </div>
</body>
</html>

`;

export default function ReportPage() {
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.image} />
      <Button title="Print" onPress={print} />
      <View style={styles.spacer} />
      <Button title="Print to PDF file" onPress={printToFile} />
      {Platform.OS === "ios" && (
        <>
          <View style={styles.spacer} />
          <Button title="Select printer" onPress={selectPrinter} />
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text
              style={styles.printer}
            >{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: { width: 200, height: 200, margin: 10 },
  textContainer: { alignItems: "center", marginBottom: 6 },
  heading: {
    fontSize: 48,
    color: "white",
    textAlign: "center",
  },
});
