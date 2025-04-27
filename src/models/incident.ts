import mongoose, { Document, Schema } from 'mongoose';

interface IIncident extends Document {
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  reportedAt: Date;
}

const incidentSchema: Schema<IIncident> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  severity: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  reportedAt: { type: Date, default: Date.now }
});

const Incident = mongoose.model<IIncident>('Incident', incidentSchema);

export default Incident;
