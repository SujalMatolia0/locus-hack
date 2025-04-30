import { SIZE_CONFIG } from '@/config/size_config';
import { Stack, Table, Title } from '@mantine/core';

const TableData = [
  { position: 6, prize: 12.011, grade: 'C', name: 'Player1' },
  { position: 7, prize: 14.007, grade: 'N', name: 'Player2' },
  { position: 39, prize: 88.906, grade: 'Y', name: 'Player3' },
  { position: 56, prize: 137.33, grade: 'Ba', name: 'Player4' },
  { position: 58, prize: 140.12, grade: 'Ce', name: 'Player5' },
];
export const LandingSectionOne = () => {
  const rows = TableData.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.grade}</Table.Td>
      <Table.Td>{element.prize}</Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <Stack
        align="left"
        py={SIZE_CONFIG.SECTION_SPACE}
        px={SIZE_CONFIG.PADDING_X}
      >
        <Title>HACKSPHERE Winners</Title>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th> Name</Table.Th>
              <Table.Th>Position</Table.Th>
              <Table.Th>Grade</Table.Th>
              <Table.Th>Prize</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Stack>
    </>
  );
};
