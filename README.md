# Healthify: Fraud Detection and Healthcare Resource Management System

## Overview

Healthify is a comprehensive platform designed to address two critical aspects of the healthcare industry:
1.  **Fraud Assurance Detection**: Identifies and flags potentially fraudulent insurance claims to ensure integrity and reduce financial loss.
2.  **Healthcare Resource Distribution**: Optimizes the allocation and distribution of medical facilities and resources based on predicted needs, improving access to care.

This project leverages a Next.js frontend, a Node.js backend with Prisma ORM, and Python/Flask for machine learning model deployment.

## Features

### Fraud Detection
-   **Automated Claim Flagging**: Utilizes a machine learning model to analyze claim data and flag suspicious claims.
-   **Claim Management Interface**: Allows insurance personnel to review, investigate, and manage flagged claims ([app/insurance/fraud/page.tsx](AkademiBrother/app/insurance/fraud/page.tsx)).
-   **Fraud Analytics Dashboard**: Provides insights into fraud trends and statistics ([app/insurance/page.tsx](AkademiBrother/app/insurance/page.tsx)).
-   **Claim Submission Form**: Enables users to submit new insurance claims ([app/insurance/form/page.tsx](AkademiBrother/app/insurance/form/page.tsx)).

### Healthcare Resource Management (Governance)
-   **Facility Needs Prediction**: Employs a machine learning model ([app/model/facility_needs_model.joblib](AkademiBrother/app/model/facility_needs_model.joblib)) to predict the facility needs score for different regions based on factors like medical history count, doctor count, and existing facility count.
-   **Hospital Registration**: Allows for the registration of new hospitals, incorporating the predicted facility needs score ([app/governance/form/page.tsx](AkademiBrother/app/governance/form/page.tsx)).
-   **Facility Analytics Dashboard**: Displays data and analytics related to hospital facility needs and distribution ([app/governance/facility/page.tsx](AkademiBrother/app/governance/facility/page.tsx)).
-   **Governance Home Page**: Overview dashboard for healthcare governance ([app/governance/page.tsx](AkademiBrother/app/governance/page.tsx)).

## Tech Stack

-   **Frontend**: Next.js, React, TypeScript, Tailwind CSS
-   **Backend**: Node.js, Express.js (via Next.js API routes)
-   **Database**: PostgreSQL (managed with Prisma ORM - [prisma/schema.prisma](AkademiBrother/prisma/schema.prisma))
-   **Machine Learning**:
    -   Python, Flask (for serving models e.g., [flask_api/facility.py](AkademiBrother/flask_api/facility.py))
    -   Scikit-learn, Pandas, NumPy (for model training e.g., [app/model/facilityneeds.ipynb](AkademiBrother/app/model/facilityneeds.ipynb), [app/model/frauddetect.ipynb](AkademiBrother/app/model/frauddetect.ipynb))
    -   Models:
        -   Facility Needs Model: [app/model/facility_needs_model.joblib](AkademiBrother/app/model/facility_needs_model.joblib)
        -   Fraud Detection Model: `fraud_model.joblib` (referenced in [app/model/frauddetect.ipynb](AkademiBrother/app/model/frauddetect.ipynb))
-   **Authentication**: NextAuth.js
-   **Deployment**: Vercel (suggested)