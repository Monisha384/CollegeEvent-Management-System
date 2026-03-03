import jsPDF from "jspdf";

export const generateCertificate = (studentName, eventName, eventDate) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4"
  });

  doc.setFillColor(245, 247, 250);
  doc.rect(0, 0, 297, 210, "F");

  doc.setDrawColor(102, 126, 234);
  doc.setLineWidth(3);
  doc.rect(10, 10, 277, 190);

  doc.setLineWidth(1);
  doc.rect(15, 15, 267, 180);

  doc.setFontSize(40);
  doc.setTextColor(102, 126, 234);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICATE", 148.5, 50, { align: "center" });

  doc.setFontSize(16);
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "normal");
  doc.text("OF PARTICIPATION", 148.5, 62, { align: "center" });

  doc.setDrawColor(102, 126, 234);
  doc.setLineWidth(0.5);
  doc.line(80, 70, 217, 70);

  doc.setFontSize(14);
  doc.setTextColor(80, 80, 80);
  doc.text("This is to certify that", 148.5, 85, { align: "center" });

  doc.setFontSize(28);
  doc.setTextColor(102, 126, 234);
  doc.setFont("helvetica", "bold");
  doc.text(studentName, 148.5, 105, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(80, 80, 80);
  doc.setFont("helvetica", "normal");
  doc.text("has successfully participated in", 148.5, 120, { align: "center" });

  doc.setFontSize(20);
  doc.setTextColor(118, 75, 162);
  doc.setFont("helvetica", "bold");
  doc.text(eventName, 148.5, 135, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "normal");
  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.text(`Date: ${formattedDate}`, 148.5, 150, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  
  doc.line(40, 175, 90, 175);
  doc.text("Event Coordinator", 65, 182, { align: "center" });

  doc.line(207, 175, 257, 175);
  doc.text("Principal", 232, 182, { align: "center" });

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Campus Events Management System", 148.5, 195, { align: "center" });
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 148.5, 200, { align: "center" });

  doc.save(`Certificate_${studentName.replace(/\s+/g, '_')}_${eventName.replace(/\s+/g, '_')}.pdf`);
};
