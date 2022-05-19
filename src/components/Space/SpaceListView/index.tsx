import React, { useState } from 'react';
import { down } from 'styled-breakpoints';
import styled from 'styled-components';
import slugify from 'slugify';
import SpaceCard from '../SpaceCard';
import { getDIDString } from 'src/utils/did';
import Pagination from 'src/components/Pagination';

const Container = styled.div`
  --repeat: 3;
  display: grid;
  grid-template-columns: repeat(var(--repeat, auto-fit), minmax(240px, 1fr));
  row-gap: 22px;
  column-gap: 22px;
  margin: 22px 30px;

  ${down('sm')} {
    row-gap: 20px;
    margin: 22px 16px;
  }
  ${down('lg')} {
    --repeat: auto-fit;
  }
`;

interface Props {
  spaces: Space[];
  explore?: boolean;
  isVisiblePageCount?: boolean;
  pageCount?: number;
}

interface PageCountProps {
  label: number;
  value: number;
}

interface PageProps {
  selected: number;
}

const SpaceListView: React.FC<Props> = ({
  spaces,
  explore = false,
  isVisiblePageCount = true,
  pageCount = 10
}: Props) => {
  const [pageOffset, setPageOffset] = useState(0);
  const [perPage, setPerPage] = useState<number>(pageCount);
  const totalPages = Math.ceil(spaces.length / perPage) ?? 1;

  const onPageCountChange = (selected: PageCountProps) => {
    setPerPage(selected.label);
  };

  const onPageChange = (data: PageProps) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * perPage);

    setPageOffset(offset);
  };

  return (
    <>
      <Container>
        {spaces.slice(pageOffset, pageOffset + perPage).map((space: any) => {
          const slug = slugify(space.name, { lower: true });
          return (
            <SpaceCard
              key={JSON.stringify(space)}
              space={space}
              explore={explore}
              link={
                explore
                  ? space.isCommunitySpace
                    ? `/community-spaces/${slug}`
                    : `/did/${getDIDString(space.owner!, true)}/spaces/${slug}`
                  : `/spaces/edit/${slug}?type=${
                      space.isCommunitySpace ? `community` : `private`
                    }`
              }
              newTab={explore}
            />
          );
        })}
      </Container>
      <Pagination
        perPage={perPage}
        totalPages={totalPages}
        lists={spaces ?? []}
        onPageCountChange={onPageCountChange}
        onPageChange={onPageChange}
        isVisiblePageCount={isVisiblePageCount}
      />
    </>
  );
};

export default SpaceListView;
