import React, { ReactElement, useEffect, useState } from 'react';
import { times } from 'lodash';
import { getAuth } from 'firebase/auth';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Text,
  Tooltip as ChakraTooltip,
} from '@chakra-ui/react';
import { usePermissions } from 'react-admin';
import moment from 'moment';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { hasAdminOrMergerPermissions, hasCrowdsourcerPermission } from 'src/shared/utils/permissions';
import { getTotalRecordedExampleSuggestions, getTotalVerifiedExampleSuggestions } from 'src/shared/DataCollectionAPI';
import UserCard from 'src/shared/components/UserCard';
import network from '../../network';
import PersonalStats from '../PersonalStats/PersonalStats';
import IgboSoundboxStats from '../IgboSoundboxStats';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const baseOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
    },
  },
};

const createChartOptions = (title) => ({
  ...baseOptions,
  plugins: {
    ...baseOptions.plugins,
    title: {
      ...baseOptions.plugins.title,
      text: title,
    },
  },
});

const mergedWorkChartOptions = createChartOptions('Merged Work');
const THREE_MONTH_WEEKS_COUNT = 12;
const sortDates = (a, b) => (a < b ? 1 : -1);
const sortMerges = (merges) =>
  Object.entries(merges)
    .sort(sortDates)
    .map(([, value]) => value)
    .reverse();

const UserStat = ({
  uid,
  user = { displayName: '', email: '', photoURL: '' },
}: {
  uid?: string;
  user?: { displayName: string; email: string; photoURL: string };
  dialectalVariations: number;
  completeExamples: number;
}): ReactElement => {
  const [userStats, setUserStats] = useState(null);
  const [mergeStats, setMergeStats] = useState(null);
  const [recordingStats, setRecordingStats] = useState({ recorded: -1, verified: -1 });
  const [audioStats, setAudioStats] = useState({ audioApprovalsCount: 0, audioDenialsCount: 0 });
  const { permissions } = usePermissions();
  const showMergeCharts = hasAdminOrMergerPermissions(permissions, true);
  const isCrowdsourcer = hasCrowdsourcerPermission(permissions, true);
  const { currentUser = { uid: '' } } = getAuth();

  useEffect(() => {
    (async () => {
      const userUid = uid || currentUser?.uid;
      network(`/stats/users/${userUid}`).then(({ json }) => setUserStats(json));
      network(`/stats/users/${userUid}/merge`).then(async ({ json: merges }) => {
        const { exampleSuggestionMerges = {}, dialectalVariationMerges = {} } = merges;
        const labels = times(
          THREE_MONTH_WEEKS_COUNT,
          (index) => `Week of ${moment().startOf('week').subtract(index, 'week').format('MMMM Do')}`,
        ).reverse();
        const updatedMergeStats = {
          labels,
          datasets: [
            {
              label: 'Example Suggestion Merges',
              data: sortMerges(exampleSuggestionMerges),
              backgroundColor: '#3C83FF',
              borderWidth: 2,
              borderColor: '#2D62BE',
              borderRadius: 10,
            },
            {
              label: 'Dialectal Variation Merges',
              data: sortMerges(dialectalVariationMerges),
              backgroundColor: '#FF5733',
              borderWidth: 2,
              borderColor: '#CA4225',
              borderRadius: 10,
            },
          ],
        };
        setMergeStats(updatedMergeStats);
        const { count: recordedExampleSuggestions } = await getTotalRecordedExampleSuggestions(userUid);
        const { count: verifiedExampleSuggestions } = await getTotalVerifiedExampleSuggestions(userUid);
        setRecordingStats({
          recorded: recordedExampleSuggestions,
          verified: verifiedExampleSuggestions,
        });
      });
      network(`/stats/users/${userUid}/audio`).then(({ json }) => {
        setAudioStats(json);
      });
    })();
  }, []);

  return (
    <Box>
      <UserCard {...(user?.email ? user : currentUser)} />
      <Box className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 space-y-4 lg:space-y-0 px-6">
        <Box className="w-full">
          <Heading as="h2" mb={4}>
            Contributions
          </Heading>
          <Box className="flex flex-col lg:flex-row justify-between items-start space-y-3 lg:space-y-0">
            <Box className="flex flex-col lg:flex-row justify-between space-x-0 lg:space-x-3">
              {/* Deprecated - the Lacuna Fund project is complete 🎉 */}
              {/* <LacunaProgress
                mergeStats={mergeStats}
                currentMonthMergeStats={currentMonthMergeStats}
                dialectalVariations={dialectalVariations}
                completeExamples={completeExamples}
              /> */}
              <IgboSoundboxStats recordingStats={recordingStats} audioStats={audioStats} />
              {!isCrowdsourcer ? <PersonalStats userStats={userStats} /> : null}
            </Box>
          </Box>
          {showMergeCharts ? (
            <Accordion defaultIndex={[0]} allowMultiple className="w-full my-6">
              <AccordionItem>
                <ChakraTooltip
                  label="These charts represent the total number of suggestions
                  merged by you on a weekly basis for the past three months."
                  placement="bottom-start"
                >
                  <AccordionButton>
                    <Box className="w-full flex flex-row items-center">
                      <Text fontWeight="bold">Three month Time-based Suggestion Merges</Text>
                      <AccordionIcon />
                    </Box>
                  </AccordionButton>
                </ChakraTooltip>
                <AccordionPanel>
                  {mergeStats ? <Bar options={mergedWorkChartOptions} data={mergeStats} /> : null}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default UserStat;
