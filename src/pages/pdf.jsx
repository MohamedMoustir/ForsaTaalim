import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Spinner from '../components/Spinner';

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

const MyDocument = ({ payment }) => {
  const [loading, setLoading] = useState(true);

  if (payment) {
    setLoading(false);
  }

  return (
    <>
      {loading && (
        <Spinner />
      )}
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>FORSATAALIM</Text>
            <Text style={styles.subtitle}>Facture #INV-2025-{payment[0]?.id}</Text>

            <View style={{ marginTop: 20 }}>
              <Text style={styles.bold}>Facturé à :</Text>
              <Text>Nom du professeur : {payment[0]?.professeur}</Text>
              <Text>Email de l'étudiant : {payment[0]?.payer_email}</Text>
              <Text>Date réservation : {payment[0]?.date_reservation}</Text>
            </View>

            <View style={{ marginTop: 30 }}>
              <Text style={styles.bold}>Détails du service</Text>
              <View style={styles.invoiceRow}>
                <Text>Durée</Text>
                <Text>{payment[0]?.dura.split(":")[0]}h</Text>
              </View>
              <View style={styles.invoiceRow}>
                <Text>Statut du paiement</Text>
                <Text>{payment[0]?.payment_status}</Text>
              </View>
            </View>

            <View style={{ marginTop: 30 }}>
              <Text style={styles.bold}>Résumé</Text>
              <View style={styles.invoiceRow}>
                <Text>Montant :</Text>
                <Text>{(
                  parseFloat(payment[0]?.amount) *
                  parseFloat(payment[0]?.dura?.split(":")[0] || 0)
                ).toFixed(2)}{" "} {payment[0]?.currencym}</Text>
              </View>
              <View style={styles.invoiceRow}>
                <Text>Status de réservation :</Text>
                <Text>{payment[0]?.status}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default MyDocument;
