import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  ArchiveIcon,
  CheckIcon,
  EditIcon,
  UnarchiveIcon,
  UncheckIcon,
} from 'elements/icons';
import Label from 'elements/Label';
import { colors } from 'styles';

const replaceLabels = (desc, done) => {
  const parts = desc.split(/(?=\S)#([-_a-zA-Z0-9]+)/gm);

  for (let i = 0; i < parts.length; i += 1) {
    if (i % 2 === 0) {
      parts[i] = <span>{parts[i].trim()}</span>;
    } else {
      const labelColor = colors.strToHex(parts[i]);
      parts[i] = (
        <Label
          key={i}
          backgroundColor={labelColor}
          color={colors.invertColor(labelColor, true)}
          done={done}
        >
          {parts[i]}
        </Label>
      );
    }
  }

  return parts;
};

const removeOwner = desc => desc.replace(/(?=\S)=([a-zA-Z0-9-_$]+)/, '');

const TaskItem = ({
  archived,
  desc,
  done,
  onDone,
  owner,
  onEdit,
  onArchive,
}) => (
  <ListItemContainer>
    {done ? (
      <Action onClick={onDone}>
        <UncheckIcon />
      </Action>
    ) : (
      <Action onClick={onDone}>
        <CheckIcon />
      </Action>
    )}
    <Description done={done}>
      {replaceLabels(removeOwner(desc), done)}
    </Description>
    <Label>{owner}</Label>
    {!archived ? (
      <>
        <Action onClick={onEdit}>
          <EditIcon padding />
        </Action>
        <Action onClick={onArchive}>
          <ArchiveIcon padding />
        </Action>
      </>
    ) : (
      <>
        <Action onClick={onArchive}>
          <UnarchiveIcon padding />
        </Action>
      </>
    )}
  </ListItemContainer>
);

TaskItem.propTypes = {
  archived: PropTypes.bool.isRequired,
  desc: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default TaskItem;

const ListItemContainer = styled.div`
  display: flex;
  height: 58px;
  padding: 0 16px;
  align-items: center;
`;

const Description = styled.p`
  padding-left: 16px;
  width: 100%;
  > span {
    margin: 0 8px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
    ${({ done }) =>
      done &&
      `
    color: ${colors.grey};
    text-decoration: line-through;
  `};
  }
`;

const Action = styled.button`
  padding-left: 12px;
  &:hover {
    cursor: pointer;
  }
  &:nth-child(1) {
    padding: 0;
  }
`;
