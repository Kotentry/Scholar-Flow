"use client";

import { useFormContext } from "react-hook-form";
import { Input, Textarea, Button, RadioGroup, Radio } from "@nextui-org/react";
import { z } from "zod";

const questionnaireSchema = z.object({
  motivation: z.object({
    whyThisSchool: z.string().min(50, "Please provide a detailed response (minimum 50 characters)"),
    goals: z.string().min(50, "Please provide a detailed response (minimum 50 characters)"),
    values: z.string().min(50, "Please provide a detailed response (minimum 50 characters)"),
  }),
  interests: z.object({
    academicInterests: z.string().min(50, "Please provide a detailed response (minimum 50 characters)"),
    subjects: z.array(z.string()).min(1, "Please select at least one subject"),
    activities: z.string().min(50, "Please provide a detailed response (minimum 50 characters)"),
  }),
  specialNeeds: z.object({
    hasSpecialNeeds: z.enum(["yes", "no"]),
    details: z.string().optional(),
    accommodations: z.string().optional(),
  }),
  additional: z.object({
    strengths: z.string().min(50, "Please provide a detailed response (minimum 50 characters)"),
    challenges: z.string().min(50, "Please provide a detailed response (minimum 50 characters)"),
    contribution: z.string().min(50, "Please provide a detailed response (minimum 50 characters)"),
  }),
});

type QuestionnaireFormData = z.infer<typeof questionnaireSchema>;

interface QuestionnaireFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function QuestionnaireForm({ onNext, onPrevious }: QuestionnaireFormProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<QuestionnaireFormData>();

  const hasSpecialNeeds = watch("specialNeeds.hasSpecialNeeds");

  return (
    <div className="space-y-8">
      {/* Motivation */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Motivation</h3>
        <div className="space-y-4">
          <Textarea
            {...register("motivation.whyThisSchool")}
            label="Why This School?"
            placeholder="What attracts you to our school? What specific aspects of our program interest you?"
            minRows={3}
            errorMessage={errors.motivation?.whyThisSchool?.message}
          />
          <Textarea
            {...register("motivation.goals")}
            label="Academic & Career Goals"
            placeholder="What are your academic and career goals? How will our school help you achieve them?"
            minRows={3}
            errorMessage={errors.motivation?.goals?.message}
          />
          <Textarea
            {...register("motivation.values")}
            label="Personal Values"
            placeholder="What personal values and characteristics do you possess that align with our school's mission?"
            minRows={3}
            errorMessage={errors.motivation?.values?.message}
          />
        </div>
      </div>

      {/* Academic Interests */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Academic Interests</h3>
        <div className="space-y-4">
          <Textarea
            {...register("interests.academicInterests")}
            label="Academic Interests"
            placeholder="Describe your academic interests and what subjects excite you the most."
            minRows={3}
            errorMessage={errors.interests?.academicInterests?.message}
          />
          <Textarea
            {...register("interests.activities")}
            label="Preferred Activities"
            placeholder="What types of learning activities do you enjoy most? (e.g., group work, independent study, hands-on projects)"
            minRows={3}
            errorMessage={errors.interests?.activities?.message}
          />
        </div>
      </div>

      {/* Special Needs */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Special Needs & Accommodations</h3>
        <div className="space-y-4">
          <RadioGroup
            {...register("specialNeeds.hasSpecialNeeds")}
            label="Do you have any special educational needs or require specific accommodations?"
          >
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </RadioGroup>

          {hasSpecialNeeds === "yes" && (
            <>
              <Textarea
                {...register("specialNeeds.details")}
                label="Details"
                placeholder="Please describe your special educational needs"
                minRows={3}
                errorMessage={errors.specialNeeds?.details?.message}
              />
              <Textarea
                {...register("specialNeeds.accommodations")}
                label="Required Accommodations"
                placeholder="What specific accommodations would help support your learning?"
                minRows={3}
                errorMessage={errors.specialNeeds?.accommodations?.message}
              />
            </>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
        <div className="space-y-4">
          <Textarea
            {...register("additional.strengths")}
            label="Personal Strengths"
            placeholder="What do you consider to be your greatest personal strengths?"
            minRows={3}
            errorMessage={errors.additional?.strengths?.message}
          />
          <Textarea
            {...register("additional.challenges")}
            label="Challenges & Growth"
            placeholder="Describe a significant challenge you've faced and how you overcame it"
            minRows={3}
            errorMessage={errors.additional?.challenges?.message}
          />
          <Textarea
            {...register("additional.contribution")}
            label="School Contribution"
            placeholder="How do you plan to contribute to our school community?"
            minRows={3}
            errorMessage={errors.additional?.contribution?.message}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end gap-3">
        <Button
          variant="bordered"
          onClick={onPrevious}
        >
          Previous: Documents
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
          onClick={() => window.location.hash = "review"}
        >
          Next: Review & Submit
        </Button>
      </div>
    </div>
  );
}
