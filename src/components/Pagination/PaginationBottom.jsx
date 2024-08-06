import React from 'react';
import { Pagination } from 'antd';

export class PaginationBottom extends React.Component {
  render() {
    const { handleChangePage, page, total_results } = this.props;
    return (
      <div className="paginationbottom">
        <Pagination
          onChange={handleChangePage}
          current={page}
          total={total_results}
          pageSize={20}
          showSizeChanger={false}
          align="center"
        />
      </div>
    );
  }
}
