"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { z } from "zod";
import { HiOutlineDocumentAdd, HiOutlineCheck, HiOutlineX } from "react-icons/hi";

const documentsSchema = z.object({
  identification: z.object({
    birthCertificate: z.string().min(1, "Birth certificate is required"),
    passport: z.string().optional(),
    nationalId: z.string().optional(),
  }),
  academic: z.object({
    transcripts: z.string().min(1, "Academic transcripts are required"),
    reportCards: z.string().min(1, "Report cards are required"),
    recommendations: z.array(z.string()).optional(),
  }),
  medical: z.object({
    healthRecords: z.string().min(1, "Health records are required"),
    immunization: z.string().min(1, "Immunization records are required"),
  }),
  additional: z.array(
    z.object({
      name: z.string().min(1, "Document name is required"),
      file: z.string().min(1, "File is required"),
    })
  ).optional(),
});

type DocumentsFormData = z.infer<typeof documentsSchema>;

interface DocumentUploadProps {
  label: string;
  description: string;
  required?: boolean;
  status?: "pending" | "uploaded" | "error";
  errorMessage?: string;
  onUpload: () => void;
}

function DocumentUpload({
  label,
  description,
  required = false,
  status = "pending",
  errorMessage,
  onUpload,
}: DocumentUploadProps) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </h4>
          <p className="text-sm text-zinc-500 mt-1">{description}</p>
          {errorMessage && (
            <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {status === "uploaded" ? (
            <>
              <HiOutlineCheck className="text-green-500 text-xl" />
              <Button
                size="sm"
                variant="light"
                color="danger"
              >
                Remove
              </Button>
            </>
          ) : status === "error" ? (
            <>
              <HiOutlineX className="text-red-500 text-xl" />
              <Button
                size="sm"
                variant="bordered"
                onClick={onUpload}
              >
                Try Again
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="bordered"
              startContent={<HiOutlineDocumentAdd />}
              onClick={onUpload}
            >
              Upload
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

interface DocumentsFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function DocumentsForm({ onNext, onPrevious }: DocumentsFormProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<DocumentsFormData>();

  const handleUpload = () => {
    // Implement file upload logic
  };

  return (
    <div className="space-y-8">
      {/* Identification Documents */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Identification Documents</h3>
        <div className="space-y-4">
          <DocumentUpload
            label="Birth Certificate"
            description="Upload a clear copy of your birth certificate"
            required
            onUpload={handleUpload}
          />
          <DocumentUpload
            label="Passport"
            description="Upload a copy of your valid passport (if available)"
            onUpload={handleUpload}
          />
          <DocumentUpload
            label="National ID"
            description="Upload a copy of your national ID (if available)"
            onUpload={handleUpload}
          />
        </div>
      </div>

      {/* Academic Documents */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Academic Documents</h3>
        <div className="space-y-4">
          <DocumentUpload
            label="Academic Transcripts"
            description="Upload your academic transcripts from your current/previous schools"
            required
            onUpload={handleUpload}
          />
          <DocumentUpload
            label="Report Cards"
            description="Upload your most recent report cards"
            required
            onUpload={handleUpload}
          />
          <DocumentUpload
            label="Letters of Recommendation"
            description="Upload letters of recommendation from teachers or mentors (optional)"
            onUpload={handleUpload}
          />
        </div>
      </div>

      {/* Medical Documents */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Medical Documents</h3>
        <div className="space-y-4">
          <DocumentUpload
            label="Health Records"
            description="Upload your recent health examination records"
            required
            onUpload={handleUpload}
          />
          <DocumentUpload
            label="Immunization Records"
            description="Upload your immunization/vaccination records"
            required
            onUpload={handleUpload}
          />
        </div>
      </div>

      {/* Additional Documents */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Additional Documents</h3>
          <Button
            size="sm"
            variant="bordered"
            startContent={<HiOutlineDocumentAdd />}
          >
            Add Document
          </Button>
        </div>
        <p className="text-sm text-zinc-500 mb-4">
          Upload any additional documents that may support your application
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-end gap-3">
        <Button
          variant="bordered"
          onClick={onPrevious}
        >
          Previous: Academic History
        </Button>
        <Button
          variant="bordered"
          onClick={() => window.location.hash = ""}
        >
          Save & Continue Later
        </Button>
        <Button
          color="primary"
          className="bg-zinc-900"
          onClick={onNext}
        >
          Next: Questionnaire
        </Button>
      </div>
    </div>
  );
}
