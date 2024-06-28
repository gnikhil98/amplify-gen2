// amplifyConfig.ts
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json'; // Adjust path as per your project structure

Amplify.configure(outputs);
