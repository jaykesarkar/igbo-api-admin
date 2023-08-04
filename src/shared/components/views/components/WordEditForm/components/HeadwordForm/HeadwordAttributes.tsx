import React, { ReactElement } from 'react';
import { Box, Checkbox, Tooltip, chakra } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import * as Interfaces from 'src/backend/controllers/utils/interfaces';
import WordAttributeEnum from 'src/backend/shared/constants/WordAttributeEnum';
import WordAttributes from 'src/backend/shared/constants/WordAttributes';

const HeadwordAttributes = ({
  record,
  errors,
  control,
  isHeadwordAccented,
  isAsCompleteAsPossible,
  isConstructedPollTerm,
}: {
  record: Interfaces.Word;
  errors: { [key: string]: { [key: string]: string } };
  control: any;
  isHeadwordAccented: boolean;
  isAsCompleteAsPossible: boolean;
  isConstructedPollTerm: boolean;
}): ReactElement => {
  const { getValues } = control;
  return (
    <Box className="w-full grid grid-flow-row grid-cols-2 gap-4 px-3">
      <Controller
        render={({ onChange, value, ref }) => (
          <Checkbox
            onChange={(e) => onChange(e.target.checked)}
            isChecked={value}
            defaultIsChecked={record.attributes?.[WordAttributeEnum.IS_STANDARD_IGBO]}
            ref={ref}
            data-test={`${WordAttributeEnum.IS_STANDARD_IGBO}-checkbox`}
            size="lg"
          >
            <chakra.span className="font-bold" fontFamily="Silka">
              {WordAttributes[WordAttributeEnum.IS_STANDARD_IGBO].label}
            </chakra.span>
          </Checkbox>
        )}
        defaultValue={
          record.attributes?.[WordAttributeEnum.IS_STANDARD_IGBO] ||
          getValues().attributes?.[WordAttributeEnum.IS_STANDARD_IGBO]
        }
        name={`attributes.${WordAttributeEnum.IS_STANDARD_IGBO}`}
        control={control}
      />
      <Tooltip
        label={!isAsCompleteAsPossible ? 'Unable to mark as complete until all necessary fields are filled' : ''}
      >
        <Box display="flex">
          <Controller
            render={({ onChange, value, ref }) => (
              <Checkbox
                onChange={(e) => onChange(e.target.checked)}
                isChecked={!!value}
                defaultIsChecked={!!(isHeadwordAccented || record.attributes?.[WordAttributeEnum.IS_ACCENTED])}
                ref={ref}
                data-test={`${WordAttributeEnum.IS_ACCENTED}-checkbox`}
                size="lg"
              >
                <chakra.span className="font-bold" fontFamily="Silka">
                  {WordAttributes[WordAttributeEnum.IS_ACCENTED].label}
                </chakra.span>
              </Checkbox>
            )}
            defaultValue={
              !!(
                isHeadwordAccented ||
                record.attributes?.[WordAttributeEnum.IS_ACCENTED] ||
                getValues().attributes?.[WordAttributeEnum.IS_ACCENTED]
              )
            }
            name={`attributes.${WordAttributeEnum.IS_ACCENTED}`}
            control={control}
          />
        </Box>
      </Tooltip>
      {errors.attributes?.isAccented ? <p className="error relative">Is Accented must be selected</p> : null}
      <Tooltip label="Check this checkbox if this word is considered casual slang">
        <Box display="flex">
          <Controller
            render={({ onChange, value, ref }) => (
              <Checkbox
                onChange={(e) => onChange(e.target.checked)}
                isChecked={value}
                defaultIsChecked={record.attributes?.[WordAttributeEnum.IS_SLANG]}
                ref={ref}
                data-test={`${WordAttributeEnum.IS_SLANG}-checkbox`}
                size="lg"
              >
                <chakra.span className="font-bold" fontFamily="Silka">
                  {WordAttributes[WordAttributeEnum.IS_SLANG].label}
                </chakra.span>
              </Checkbox>
            )}
            defaultValue={
              record.attribute?.[WordAttributeEnum.IS_SLANG] || getValues().attributes?.[WordAttributeEnum.IS_SLANG]
            }
            name={`attributes.${WordAttributeEnum.IS_SLANG}`}
            control={control}
          />
        </Box>
      </Tooltip>
      <Tooltip
        label={
          isConstructedPollTerm
            ? "This checkbox is automatically checked since it's a constructed term that comes from a Twitter poll"
            : 'Check this checkbox if this is a newly coined, aka constructed, Igbo word'
        }
      >
        <Box display="flex">
          <Controller
            render={({ onChange, value, ref }) => (
              <Checkbox
                onChange={(e) => onChange(e.target.checked)}
                isChecked={isConstructedPollTerm || value}
                defaultIsChecked={isConstructedPollTerm || record.attributes?.[WordAttributeEnum.IS_CONSTRUCTED_TERM]}
                isDisabled={isConstructedPollTerm}
                ref={ref}
                data-test={`${WordAttributeEnum.IS_CONSTRUCTED_TERM}-checkbox`}
                size="lg"
              >
                <chakra.span className="font-bold" fontFamily="Silka">
                  {WordAttributes[WordAttributeEnum.IS_CONSTRUCTED_TERM].label}
                </chakra.span>
              </Checkbox>
            )}
            defaultValue={
              isConstructedPollTerm ||
              record.attribute?.[WordAttributeEnum.IS_CONSTRUCTED_TERM] ||
              getValues().attributes?.[WordAttributeEnum.IS_CONSTRUCTED_TERM]
            }
            name={`attributes.${WordAttributeEnum.IS_CONSTRUCTED_TERM}`}
            control={control}
          />
        </Box>
      </Tooltip>
      <Tooltip label="Check this checkbox if this word is borrowed from another language">
        <Box display="flex">
          <Controller
            render={({ onChange, value, ref }) => (
              <Checkbox
                onChange={(e) => onChange(e.target.checked)}
                isChecked={value}
                defaultIsChecked={record.attributes?.[WordAttributeEnum.IS_BORROWED_TERM]}
                ref={ref}
                data-test={`${WordAttributeEnum.IS_BORROWED_TERM}-checkbox`}
                size="lg"
              >
                <chakra.span className="font-bold" fontFamily="Silka">
                  {WordAttributes[WordAttributeEnum.IS_BORROWED_TERM].label}
                </chakra.span>
              </Checkbox>
            )}
            defaultValue={
              record.attribute?.[WordAttributeEnum.IS_BORROWED_TERM] ||
              getValues().attributes?.[WordAttributeEnum.IS_BORROWED_TERM]
            }
            name={`attributes.${WordAttributeEnum.IS_BORROWED_TERM}`}
            control={control}
          />
        </Box>
      </Tooltip>
      <Tooltip
        label="Check this checkbox if this word is a word stem.
        Checking this box will ignore the Word Stems area on this form."
      >
        <Box display="flex">
          <Controller
            render={({ onChange, value, ref }) => (
              <Checkbox
                onChange={(e) => onChange(e.target.checked)}
                isChecked={value}
                defaultIsChecked={record.attributes?.[WordAttributeEnum.IS_STEM]}
                ref={ref}
                data-test={`${WordAttributeEnum.IS_STEM}-checkbox`}
                size="lg"
              >
                <chakra.span className="font-bold" fontFamily="Silka">
                  {WordAttributes[WordAttributeEnum.IS_STEM].label}
                </chakra.span>
              </Checkbox>
            )}
            defaultValue={
              record.attribute?.[WordAttributeEnum.IS_STEM] || getValues().attributes?.[WordAttributeEnum.IS_STEM]
            }
            name={`attributes.${WordAttributeEnum.IS_STEM}`}
            control={control}
          />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default HeadwordAttributes;
