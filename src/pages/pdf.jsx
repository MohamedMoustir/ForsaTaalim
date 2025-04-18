import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#f3f4f6',
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 1.5,
    color: '#111827',
  },
  section: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  block: {
    marginBottom: 20,
  },
  invoiceRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e5e7eb',
    paddingVertical: 6,
    marginBottom: 4,
  },
  totalRow: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    borderTop: '1px solid #9ca3af',
    paddingTop: 6,
  }
});
 
const MyDocument = ({Mespaiements}) => {


  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>INVOICE</Text>
        <Text style={styles.subtitle}>Invoice #INV-2024-001</Text>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.bold}>Bill To:</Text>
          <Text>Client Name</Text>
          <Text>Client Address</Text>
          <Text>City, State ZIP</Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={styles.bold}>Services</Text>
          <View style={styles.invoiceRow}>
            <Text>Web Design Service</Text>
            <Text>$1,500.00</Text>
          </View>
          <View style={styles.invoiceRow}>
            <Text>Hosting Setup</Text>
            <Text>$250.00</Text>
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={styles.bold}>Summary</Text>
          <View style={styles.invoiceRow}>
            <Text>Subtotal:</Text>
            <Text>$1,750.00</Text>
          </View>
          <View style={styles.invoiceRow}>
            <Text>Tax (10%):</Text>
            <Text>$175.00</Text>
          </View>
          <View style={[styles.invoiceRow, styles.bold]}>
            <Text>Total:</Text>
            <Text>$1,925.00</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
  );
};

export default MyDocument;
