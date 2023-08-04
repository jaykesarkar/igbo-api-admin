import React, { ReactElement } from 'react';
import { get } from 'lodash';
import { Badge, Tooltip } from '@chakra-ui/react';
import * as Interfaces from 'src/backend/controllers/utils/interfaces';
import SuggestionSourceEnum from 'src/backend/shared/constants/SuggestionSourceEnum';

const SourceField = ({
  record,
  source,
}: {
  label?: string;
  record?: Interfaces.Word;
  source: string;
}): ReactElement => {
  const value = get(record, source);
  const badgeLabel = value === SuggestionSourceEnum.COMMUNITY ? 'Nkọwa okwu' : 'Igbo API Editor';
  const label =
    SuggestionSourceEnum.COMMUNITY === value
      ? 'This suggestion came from a user on Nkọwa okwu'
      : 'This suggestion came from the internal Igbo API Editor Platform';

  return (
    <Tooltip label={label}>
      <Badge
        cursor="default"
        variant="outline"
        colorScheme={value === SuggestionSourceEnum.COMMUNITY ? 'purple' : 'gray'}
      >
        {badgeLabel}
      </Badge>
    </Tooltip>
  );
};

SourceField.defaultProps = {
  record: { id: null },
};

export default SourceField;
