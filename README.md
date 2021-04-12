# Azure DevOps API

This projects wraps Azure DevOps API in NodeJs (ExpressJs) wrapper.

Important Commands

- `tsc` to build js from ts
- `node dist/index.js` to run node server

## ❔ Sample Request

### Query Params

#### `org`

The organization name(id)

#### `token`

Your PAT of Azure devOps

#### `iterationPaths`

Iteration path to find work items (backlogs) in.
### Request

```
http://localhost:3000/generate?org=flick2know&token=<token>&iterationPaths=["Field_Assist\\FA Team 2\\Sprint 120 T2", "Field_Assist\\FA Team 3\\Sprint120 T3"]
```

### Response

```markdown
# Sprint notes

## Bug- Allowing User to View Sales in Revenue in MT Summary Report

### Epic: [MT- Product Enhancement](https://dev.azure.com/flick2know/03de2bf5-6b21-4d0c-ae7c-1660f71cc8a6/_workitems/edit/17979)

### Feature: [MT Enhanements](https://dev.azure.com/flick2know/03de2bf5-6b21-4d0c-ae7c-1660f71cc8a6/_workitems/edit/7763)

**Acceptance Criteria**: <div>As a Manager, I shall be allowed to View Sales in Revenue in Column &quot; Sales(Value) in place of Sales(StdUnit)</div><div><br></div><div>Tech Notes -</div><div><br></div><div>In Attendance table, In column Sales in Revenue, Sales Std Unit is being stored.</div><div>Sales- Direct Entered by User.&nbsp;</div><div>Sales = Sale in Unit * MRP<br><br><a href="https://app.asana.com/0/43051116721058/1200029354588319">https://app.asana.com/0/43051116721058/1200029354588319</a><br></div>

### Related Links:
Backlog: [39990](https://dev.azure.com/flick2know/03de2bf5-6b21-4d0c-ae7c-1660f71cc8a6/_workitems/edit/39990)  
Feature: [7763](https://dev.azure.com/flick2know/03de2bf5-6b21-4d0c-ae7c-1660f71cc8a6/_workitems/edit/39990)  
Epic: [17979](https://dev.azure.com/flick2know/03de2bf5-6b21-4d0c-ae7c-1660f71cc8a6/_workitems/edit/17979)  

## Show only products which have van stock entered in the order flow of van sales

### Epic: [Van Sales in GT App](https://dev.azure.com/flick2know/03de2bf5-6b21-4d0c-ae7c-1660f71cc8a6/_workitems/edit/36115)

### Feature: [Van sales in the user application](https://dev.azure.com/flick2know/03de2bf5-6b21-4d0c-ae7c-1660f71cc8a6/_workitems/edit/37218)

**Acceptance Criteria**: <ol><li>User shall be able to see only products which have van stock present in the van in the below pages if userrole is DSR</li><ol style="list-style:lower-alpha;"><li>Fast Moving</li><li>Focussed section</li><li>All products</li><li>Must Sell</li></ol><li>When the stock is exhausted(stock=0) as per day's sale, user shall not be able to see the particular product from next outlet onwards.</li><li>User shall be able to see the live van stock information against each SKU as per the UI (Suggested order quantity UI)</li><li>Banner shall be visible as per below priority heirarchy</li><ol style="list-style:lower-alpha;"><li><span>Selected &gt; Retailer Stock &gt; Distributor Stock &gt; Suggested Order Quantity &gt; Van Stock &gt; Nil</span><br></li></ol><li>Banner shall not be visible in Retailer stock flow.</li></ol><div><br></div><div><a href="https://gallery.io/files/5f5e84ec90e44e099b01cfa8b2442499">https://gallery.io/files/5f5e84ec90e44e099b01cfa8b2442499</a><br></div>

### Related Links:
Backlog: [40115](https://dev.azure.com/flick2know/03de2bf5-6b21-4d0c-ae7c-1660f71cc8a6/_workitems/edit/40115)  
Feature: [37218](https://dev.azure.com/flick2know/03de2bf5-6b21-4d0c-ae7c-1660f71cc8a6/_workitems/edit/40115)  
Epic: [36115](https://dev.azure.com/flick2know/03de2bf5-6b21-4d0c-ae7c-1660f71cc8a6/_workitems/edit/36115)  
```
## Extras

For VS Code debugging

https://pkief.medium.com/how-to-debug-typescript-with-vs-code-9cec93b4ae56

## 👍 Contribution

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -m 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

## ✨ Active Contributors

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/apgapg"><img src="https://avatars0.githubusercontent.com/u/13887407?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ayush P Gupta</b></sub></a><br /></td>
  </tr>

</table>