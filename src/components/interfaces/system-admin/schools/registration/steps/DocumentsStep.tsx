'use client';

import { useFormContext } from 'react-hook-form';
import { Card, CardBody, Button } from '@nextui-org/react';
import { type SchoolRegistrationData } from '@/lib/types/school-registration';
import {
  HiOutlineUpload,
  HiOutlineDocumentText,
  HiOutlineExclamationCircle,
  HiOutlineCheck,
  HiOutlineX,
} from 'react-icons/hi';

const requiredDocuments = [
  {
    id: 'registrationCertificate',
    label: 'Registration Certificate',
    description: 'Official school registration document',
    accept: '.pdf,.doc,.docx',
  },
  {
    id: 'taxDocument',
    label: 'Tax Document',
    description: 'Tax registration certificate',
    accept: '.pdf,.doc,.docx',
  },
  {
    id: 'licenseCertificate',
    label: 'License Certificate',
    description: 'Educational institution license',
    accept: '.pdf,.doc,.docx',
  },
];

export default function DocumentsStep() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<SchoolRegistrationData>();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue(`documents.${fieldName}`, file);
    }
  };

  const documents = watch('documents');

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Required Documents</h2>
        <p className="text-default-500">
          Upload all required documents and certificates
        </p>
      </div>

      <div className="grid gap-6">
        {requiredDocuments.map((doc) => {
          const file = documents?.[doc.id as keyof typeof documents] as File;
          const error = errors.documents?.[doc.id as keyof typeof errors.documents]?.message;

          return (
            <Card key={doc.id}>
              <CardBody className="gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-default-100">
                      <HiOutlineDocumentText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{doc.label}</p>
                      <p className="text-small text-default-500">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                  {file && (
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => setValue(`documents.${doc.id}`, null)}
                    >
                      <HiOutlineX className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {file ? (
                  <div className="flex items-center gap-2 text-small">
                    <HiOutlineCheck className="w-4 h-4 text-success" />
                    <span>{file.name}</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      as="label"
                      htmlFor={doc.id}
                      variant="flat"
                      color="primary"
                      className="bg-black text-white cursor-pointer"
                      startContent={<HiOutlineUpload className="w-4 h-4" />}
                    >
                      Upload Document
                      <input
                        type="file"
                        id={doc.id}
                        accept={doc.accept}
                        className="hidden"
                        onChange={(e) => handleFileChange(e, doc.id)}
                      />
                    </Button>
                    {error && (
                      <div className="flex items-center gap-1 text-danger text-small">
                        <HiOutlineExclamationCircle className="w-4 h-4" />
                        <span>{error}</span>
                      </div>
                    )}
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}

        <Card>
          <CardBody className="gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-default-100">
                <HiOutlineDocumentText className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">Additional Documents</p>
                <p className="text-small text-default-500">
                  Upload any additional supporting documents (optional)
                </p>
              </div>
            </div>

            <Button
              as="label"
              htmlFor="otherDocuments"
              variant="flat"
              color="primary"
              className="bg-black text-white cursor-pointer"
              startContent={<HiOutlineUpload className="w-4 h-4" />}
            >
              Upload Documents
              <input
                type="file"
                id="otherDocuments"
                multiple
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setValue('documents.otherDocuments', files);
                }}
              />
            </Button>

            {documents?.otherDocuments?.length > 0 && (
              <div className="grid gap-2">
                {Array.from(documents.otherDocuments).map((file: File, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg bg-default-100"
                  >
                    <div className="flex items-center gap-2 text-small">
                      <HiOutlineCheck className="w-4 h-4 text-success" />
                      <span>{file.name}</span>
                    </div>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => {
                        const newFiles = Array.from(documents.otherDocuments).filter(
                          (_, i) => i !== index
                        );
                        setValue('documents.otherDocuments', newFiles);
                      }}
                    >
                      <HiOutlineX className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
